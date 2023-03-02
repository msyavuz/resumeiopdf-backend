import express from "express";
import { getBufferFromSID } from "./service";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/:sid", async (req, res) => {
    const sid = req.params.sid;
    const buffer = await getBufferFromSID(sid);
    res.type("pdf");
    res.send(Buffer.from(buffer));
});

app.listen(3002, () => {
    console.log("Server listening on port: 3002");
});
