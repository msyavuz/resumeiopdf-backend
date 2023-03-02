import express from "express";
import { getBufferFromSID } from "./service";

const app = express();

app.get("/:sid", async (req, res) => {
    const sid = req.params.sid;
    console.log(sid);
    const buffer = await getBufferFromSID(sid);
    console.log(buffer);
    res.type("pdf");
    res.send(Buffer.from(buffer));
});

app.listen(3002, () => {
    console.log("Server listening on port: 3002");
});
