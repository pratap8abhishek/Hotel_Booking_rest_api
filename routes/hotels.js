const express = require("express");
const {countByCity,countByType,createHotel,deleteHotel,
    getHotel,getHotelRooms,getHotels,updateHotel} = require("../controllers/hotel");

const {verifyAdmin} = require("../utils/verifyToken");
const Hotel = require("../models/Hotel");
const router = require("express").Router();

//CREATE
router.post("/",verifyAdmin,createHotel);

//UPDATE
router.put("/:id",verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

//GET
router.get("/find/:id", getHotel);

//GET ALL
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

module.export = router;