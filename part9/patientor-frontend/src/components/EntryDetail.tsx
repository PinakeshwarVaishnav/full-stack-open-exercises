import { Entry } from "../types/Entry";

const EntryDetail: React.FC<{ entry: Entry }> = ({ entry }) => {
  console.log("entry is", entry);

  const assertNever = (x: never): never => {
    throw new Error(`unexpected object: ${x}`);
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <ul>
            <h3>Hospital Entry</h3>
            <li>{entry.date}</li>
            <li>{entry.description}</li>
            <li>diagnose by {entry.specialist}</li>
          </ul>
        </div>
      );
    case "HealthCheck":
      return (
        <div>
          <ul>
            <h3>Health Check Entry</h3>
            <li>{entry.date}</li>
            <li>{entry.description}</li>
            <li>diagnose by {entry.specialist}</li>
          </ul>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <ul>
            <h3>Occupational HealthCare Entry</h3>
            <li>{entry.date}</li>
            <li>{entry.description}</li>
            <li>diagnose by {entry.specialist}</li>
          </ul>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetail;
