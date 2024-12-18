import { Router, Request, Response } from "express";
import data from "../../data/patients";
import { PatientWithoutSSN } from "../types/PatientWithoutSSN";
import { toNewPatient, toNewEntry } from "../utils";
import { z } from "zod";

const router = Router();

router.get("/", (req: Request, res: Response): void => {
  console.log("request method for patients is", req.method);
  const patientsWithoutSSN: PatientWithoutSSN[] = data.map(
    ({ ssn: _ssn, ...rest }) => rest,
  );
  res.json(patientsWithoutSSN);
});

router.get("/:id", (req: Request, res: Response): void => {
  const id = req.params.id;
  console.log("getting patient details for id", id);

  const patient = data.find((patient) => patient.id === id);
  console.log("patient is", patient);

  if (patient) {
    res.status(200).json(patient);
  } else {
    res.status(404).json({ error: "patient not found" });
  }
});

router.post("/", (req: Request, res: Response): void => {
  console.log("request method for patients is", req.method);
  try {
    const newPatient = toNewPatient(req.body);

    data.push(newPatient);

    res.status(201).json(newPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

router.post("/:id/entries", (req: Request, res: Response): any => {
  console.log(
    "request for new entry is",
    req.body,
  );

  const patientId = req.params.id;

  try {
    const newEntry = toNewEntry(req.body);

    const patient = data.find((patient) => patient.id === patientId);

    if (!patient) {
      return res
        .status(404)
        .json({ error: "adding entry failed: patient not found" });
    }

    patient.entries.push(newEntry);

    res.status(201).json({
      message: `Entry for the patient ${patient.name} added successfully`,
      newEntry,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

export default router;
