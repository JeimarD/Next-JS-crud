import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Form = ({ formData, forNewMovie = true }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    title: formData.title,
    plot: formData.plot,
  });
  const [message, setMessage] = useState([]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (forNewMovie) {
      postData(form);
    } else {
      //editar data
      putData(form);
    }
  };

  const putData = async (form) => {
    setMessage([]);
    const { id } = router.query;
    try {
      const res = await fetch(`/api/movie/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        for (const key in data.error.errors) {
          let error = data.error.errors[key];
          setMessage((oldmenssage) => [
            ...oldmenssage,
            { message: error.message },
          ]);
        }
      } else {
        setMessage([]);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (form) => {
    try {
      const res = await fetch("/api/movie", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        for (const key in data.error.errors) {
          let error = data.error.errors[key];
          setMessage((oldmenssage) => [
            ...oldmenssage,
            { message: error.message },
          ]);
        }
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control my-2"
        placeholder="Title"
        name="title"
        autoComplete="off"
        value={form.title}
        onChange={handleChange}
      />
      <input
        type="text"
        className="form-control my-2"
        placeholder="Plot"
        name="plot"
        autoComplete="off"
        value={form.plot}
        onChange={handleChange}
      />
      <button className="btn btn-primary w-100" type="submit">
        {forNewMovie ? "Agregar" : "Editar"}
      </button>
      <Link href="/">
        <a className="btn btn-warning w-100">Volver...</a>
      </Link>
      {message.map(({ message }) => (
        <p key={message}>{message}</p>
      ))}
    </form>
  );
};

export default Form;
