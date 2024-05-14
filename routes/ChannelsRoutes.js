const express = require("express");
const router = express.Router();
const channelsService = require("../services/ChannelsService");

router.get("/", channelsService.getAllChannels);
router.put("/", channelsService.updateChannel);
router.post("/", channelsService.createChannel);
router.delete("/", channelsService.deleteChannel);

module.exports = router;
