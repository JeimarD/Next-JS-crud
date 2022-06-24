import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const New = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    plot: "",
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
    postData(form);
  };

  const postData = async (form) => {
    try {
      console.log(form);
      const res = await fetch("/api/movie", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);

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
    <div className="container">
      <h1 className="my-3">Agregar Movie</h1>
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
          Agregar
        </button>
        <Link href="/">
          <a className="btn btn-warning w-100">Volver...</a>
        </Link>
        {message.map(({ message }) => (
          <p key={message}>{message}</p>
        ))}
      </form>
    </div>
  );
};

export default New;
