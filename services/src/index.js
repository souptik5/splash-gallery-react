// import Unsplash from "unsplash-js";
const express = require("express");

const Unsplash = require("unsplash-js").default;

var cors = require("cors");

const { toJson } = require("unsplash-js");

global.fetch = require("node-fetch");

const app = express();

app.use(cors());

const unsplash = new Unsplash({
  accessKey: "8a66a6091f247c1066b17034f84ecd4f727c7d8b91290449dbee544f98b6c323",
  secret: "6a830a7842f9e96ac63fd315cf0ed5c91a72bcdcbb4dc7c3d96021fc273edc6d"
});

app.get("/api/photos", (req, res) => {
  //   res.send("Hello World");
  //   make request to the api

  const page = req.query.page || 1;
  const take = req.query.take || 30;
  const category = req.query.category || "latest";

  unsplash.photos
    .listPhotos(page, take, category)
    .then(toJson)
    .then(photos => {
      // returns photos
      return res.json(photos);
    });
});

app.get("/api/search", (req, res) => {
  const keyword = req.query.keyword;
  const page = req.query.page || 1;
  const take = req.query.take || 30;
  const filter = req.query.filter || "portrait";

  unsplash.search
    .photos(keyword, page, take, filter)
    .then(toJson)
    .then(photos => {
      // return photos
      return res.json(photos);
    });
});

app.listen(8080);
