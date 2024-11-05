// src/components/LoginModal.js
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const closeModal = () => {
    document.getElementById("login_modal").close();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const url = isRegistering
      ? "http://localhost:8000/api/register"
      : "http://localhost:8000/api/login";

    try {
      const response = await axios.post(url, { email, password });

      if (response.status === 200 || response.status === 201) {
        const { token, payload } = response.data;

        if (!isRegistering) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(payload));
        }

        console.log(
          isRegistering ? "Register Success:" : "Login successful:",
          response.data
        );

        setIsLoading(false);
        closeModal();

        Swal.fire({
          icon: "success",
          title: isRegistering
            ? "Registration Successful!"
            : "Login Successful!",
          text: isRegistering
            ? "You have successfully registered."
            : "You have successfully logged in.",
          confirmButtonText: "OK",
        }).then(() => {
          if (!isRegistering) {
            window.location.reload();
          }
        });

        setEmail("");
        setPassword("");
      }
    } catch (error) {
      closeModal();

      Swal.fire({
        icon: "error",
        title: isRegistering ? "Registration Failed" : "Login Failed",
        text: error.response?.data.message || "Please check your credentials!",
        confirmButtonText: "OK",
      });

      setEmail("");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
    setEmail("");
    setPassword("");
  };

  return (
    <dialog id="login_modal" className="modal">
      <form method="dialog" className="modal-box" onSubmit={handleLogin}>
        <h3 className="flex font-bold text-lg justify-center">
          {isRegistering ? "Register" : "Login"}
        </h3>

        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={closeModal}
              >
                ✕
              </button>
              <button type="submit" className="btn btn-error w-full">
                <p className="text-white">
                  {isRegistering ? "Register" : "Login"}
                </p>
              </button>
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="button"
                className="text-red-500 hover:underline"
                onClick={toggleRegister}
              >
                {isRegistering
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </button>
            </div>
          </>
        )}
      </form>
    </dialog>
  );
};

export default LoginModal;
