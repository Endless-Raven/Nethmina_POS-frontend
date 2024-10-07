import React, { useState } from "react";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { signInSuccess } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = process.env.API_BASE_URL;

export default function Login() {
  const [formDetail, setFormDetail] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const userData = useSelector((state) => state.user.data); // see user data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormDetail((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    if (formDetail.username === "" || formDetail.password === "") {
      setError("fill details");
    } else {
      try {
        const response = await axios.post(`${API_BASE_URL}/users/signin`, {
          username: formDetail.username,
          password: formDetail.password,
        });
        dispatch(signInSuccess(response.data.user));
        setLoading(false);
        setError(null);
        setFormDetail({
          username: "",
          password: "",
        });
        navigate("/home/billing");
      } catch (error) {
        console.log(error);
        setError(error.response ? error.response.data.message : error.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-[url('https://img.freepik.com/premium-vector/white-background-with-blue-technology-circuit_583398-369.jpg')] bg-cover bg-center w-full h-screen flex items-center justify-center">
      <Card className="max-w-md">
        <form className="flex flex-col gap-8 w-72">
          <h1 className="font-bold text-2xl text-cyan-500 cursor-default text-center">
            Nethmina <span className="text-sky-600">Mobile</span>{" "}
          </h1>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Your Username" />
            </div>
            <TextInput
              id="username"
              name="username"
              type="text"
              placeholder="saman edirimuni"
              value={formDetail.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              required
              name="password"
              value={formDetail.password}
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            {error && (
              <p className="absolute z-10 -top-6 right-1 text-red-500 text-sm ">
                {error}
              </p>
            )}
            <Button
              type="submit"
              onClick={handleLogin}
              gradientDuoTone="purpleToBlue"
              className="w-full"
              disabled={loading}
            >
              Login
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
