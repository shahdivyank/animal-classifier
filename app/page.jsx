"use client";
import { useState } from "react";
import Input from "../components/Input";
import Viewer from "../components/Viewer";
import Button from "../components/Button";
import { FaObjectGroup } from "react-icons/fa";

export default function Home() {
  const [image, setImage] = useState();
  const [result, setResult] = useState("");

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleInput = async (e) => {
    const file = e.target.files[0];
    const base64 = await readFileAsBase64(file);
    setImage(base64);
  };

  const handleClassify = async () => {
    console.log({
      body: JSON.stringify({
        image,
      }),
    });

    const response = await fetch("http://127.0.0.1:5328/api/classify", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image }),
    });

    console.log("RESPONSE", response);

    const data = await response.json();

    const split = data.split("_");

    setResult({ name: split[0], confidence: split[1] });
  };

  const handleClear = () => {
    setImage(null);
    setResult({
      name: "",
      confidence: "",
    });
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold m">Animal Classifer</h1>
        <p className="mb-8">
          by: Hallie Pham, Ben Bravo, Majd Kawak, Nicholas Kang, Divyank Shah
        </p>

        <Viewer image={image} />
        {image && (
          <Button
            text="classify"
            Icon={FaObjectGroup}
            onClick={handleClassify}
          />
        )}
        <Input
          image={image}
          onClick={handleClear}
          type="file"
          onChange={handleInput}
          accept=".png,.jpeg,.jpg,.webp"
        />
        <p className="text-xl font-semibold mt-4">
          Predicted Class: {result.name ?? "N/A"}
        </p>
        <p className="text-xl">
          Confidence: {`${result.confidence ?? "N/A"}%`}
        </p>
      </div>
    </div>
  );
}
