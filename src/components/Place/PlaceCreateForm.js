import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import uuid from "random-uuid-v4";
import "firebase/compat/storage";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

import firebaseApp from "../../config/firebase";

import { PLACE_CREATE_RESET } from "../../constants/place";

import { createPlace } from "../../store/actions/place";

import Message from "../UI/Message";

const Input = styled("input")({
  display: "none",
});

const PlaceImages = (props) => {
  return (
    <ImageList sx={{ width: 450, height: 150 }} cols={3} rowHeight={150}>
      {props.source.map((image) => {
        return (
          <ImageListItem key={image}>
            <img src={image} key={image} alt={image} />;
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};

const PlaceCreateForm = (props) => {
  const { history } = props;

  const [selectedImages, setSelectedImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [phone, setPhone] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [activities, setActivities] = useState([""]);
  const [loadingImages, setLoadingImages] = useState(false);

  const dispatch = useDispatch();

  const placeCreate = useSelector((state) => state.placeCreate);
  const { loading, success, error } = placeCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: PLACE_CREATE_RESET });
      history.push("/dashboard/places");
    }
  }, [dispatch, success, history]);

  const onChangeImageHandler = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setSelectedImages((prevImages) => prevImages.concat(fileArray));

      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  const onChangeActivityHandler = (i, e) => {
    let newActivity = [...activities];
    newActivity[i] = e.target.value;
    setActivities(newActivity);
  };

  const addActivityFieldHandler = () => {
    setActivities([...activities, ""]);
  };

  const removeActivityFieldHandler = (i) => {
    let newActivity = [...activities];
    newActivity.splice(i, 1);
    setActivities(newActivity);
  };

  const uploadImagesToStorageHandler = async () => {
    const imagesBlob = [];

    await Promise.all(
      selectedImages.map(async (image) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebaseApp.storage().ref("places").child(uuid());
        await ref.put(blob).then(async (result) => {
          await firebaseApp
            .storage()
            .ref(`places/${result.metadata.name}`)
            .getDownloadURL()
            .then((imageUrl) => {
              imagesBlob.push(imageUrl);
            });
        });
      })
    );

    return imagesBlob;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoadingImages(true);
    uploadImagesToStorageHandler().then((response) => {
      dispatch(
        createPlace({
          name: name,
          description: description,
          address: address,
          latitude: latitude,
          longitude: longitude,
          price: price,
          cellphone: cellphone,
          phone: phone,
          activities: activities,
          images: response,
        })
      );
      setLoadingImages(false);
    });
  };

  return (
    <Fragment>
      <Typography component="h1" variant="h4" align="center">
        Nuevo lugar
      </Typography>
      <Grid container spacing={3}>
        {error && (
          <Grid item xs={12}>
            <Message severity="error">{error}</Message>
          </Grid>
        )}
        <Grid item xs={6}>
          <PlaceImages source={selectedImages} />
          {selectedImages.length >= 3 ? null : (
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={onChangeImageHandler}
              />
              <Button variant="contained" component="span">
                Subir imágenes
              </Button>
            </label>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="name"
            label="Nombre"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Descripción"
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="price"
            label="Precio"
            variant="standard"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="address"
            label="Dirección"
            variant="standard"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="latitude"
            label="Latitud"
            variant="standard"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="longitude"
            label="Longitud"
            variant="standard"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="phone"
            label="Teléfono"
            variant="standard"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="cellphone"
            label="Celular"
            variant="standard"
            value={cellphone}
            onChange={(e) => setCellphone(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        {activities.map((element, index) => {
          return (
            <Fragment key={`div${index}`}>
              <Grid item xs={8} key={`gridActivity${index}`}>
                <TextField
                  key={index}
                  value={element || ""}
                  name="activity"
                  label={`Acitvity #${index + 1}`}
                  variant="standard"
                  onChange={(e) => onChangeActivityHandler(index, e)}
                  required
                  fullWidth
                />
              </Grid>
              {index ? (
                <Grid item xs={4} key={`gridButton${index}`}>
                  <Button
                    key={`button${index}`}
                    variant="contained"
                    onClick={() => {
                      removeActivityFieldHandler(index);
                    }}
                  >
                    Eliminar
                  </Button>
                </Grid>
              ) : null}
            </Fragment>
          );
        })}
        <Grid item xs={8}>
          <Button variant="contained" onClick={() => addActivityFieldHandler()}>
            Añadir actividad
          </Button>
        </Grid>
        <Grid item xs={4} justifyContent="flex-end">
          <LoadingButton
            loading={loadingImages || loading}
            variant="contained"
            onClick={(e) => submitHandler(e)}
            fullWidth
          >
            Guardar
          </LoadingButton>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default withRouter(PlaceCreateForm);
