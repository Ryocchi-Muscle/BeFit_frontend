import Image from "next/image";
import React from "react";

const ProgramCard: React.FC<{
  title: string;
  image: string;
  details?: string[];
}> = ({ title, image, details }) => (
  <div style={styles.programCard}>
    {/* <Image
      src={image}
      alt={title}
      style={styles.programImage}
      width={400}
      height={300}
    /> */}
    <h3>{title}</h3>
    {details && (
      <ul style={styles.programDetails}>
        {details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
    )}
  </div>
);

const styles = {
  programCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "10px",
    margin: "10px",
    textAlign: "center" as "center",
    width: "100%",
    maxWidth: "400px",
  },
  programImage: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
  },
  programDetails: {
    textAlign: "left" as "left",
    paddingLeft: "20px",
  },
};

export default ProgramCard;
