import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../components/Form";

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error(
      "Un error ha ocurrido mientras se obtenia la informacion"
    );
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const { data } = await res.json();

  return data;
};

const EditMovie = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: movie, error } = useSWR(
    id ? `/api/movie/${id}` : null,
    fetcher
  );

  if (error) {
    return (
      <div>
        <h1>Ha ocurrido un error</h1>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mt-5 text-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  const formData = {
    title: movie.title,
    plot: movie.plot,
  };

  return (
    <div className="container">
      <h1>Editar Movie</h1>
      <Form forNewMovie={false} formData={formData}></Form>
    </div>
  );
};

export default EditMovie;
