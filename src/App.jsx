import { useEffect, useState, useRef } from "react";
import Loading from "./Loading";
import Profile from "./Profile";
import "./App.css";

var myPhoto = "";

const App = () => {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState("mdato");
  const gitHub = `https://api.github.com/users/${users}/repos?page=1&per_page=100&sort=updated`;

  const searchGit1 = `https://api.github.com/users/`;
  const searchGit2 = `/repos?page=1&per_page=100&sort=updated`;

  useEffect(() => {
    const fetchGithub = async () => {
      const response = await fetch(gitHub);
      const data = await response.json();
      setItems(data);
      myPhoto = data[0].owner.avatar_url;
      //console.log(data[0].owner.avatar_url);
    };
    fetchGithub();
  }, []);

  const searchEl = useRef(null);

  const fetchData = (gitHub) => {
    fetch(gitHub)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setItems(data);
        myPhoto = data[0].owner.avatar_url;
        setUsers(data[0].owner.login);
      });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const search = searchEl.current.value;
    if (search) {
      fetchData(searchGit1 + search + searchGit2);
    }
  };

  return (
    <>
      {!items ? (
        <Loading />
      ) : (
        <>
          <section className="grid-cols-1 pt-1 pb-20">
            <div className="titulo">
              <img
                src={myPhoto}
                alt={users}
                className="w-48 md:w-20 lg:w-20 rounded-full shadow "
              />

              <h1>
                {users}'s Repositories{" "}
                <span className="text-xs">({items.length})</span>
              </h1>

              <div className="header">
                <form onSubmit={onSubmitHandler}>
                  <input
                    className="header-search w-100 p-2 rounded-md	shadow"
                    type="search"
                    placeholder="Search"
                    ref={searchEl}
                  />
                </form>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-10">
              {items.map((item) => (
                <Profile key={item.id} {...item} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default App;
