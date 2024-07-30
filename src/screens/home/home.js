import React, { useState, useEffect } from 'react';
import { setClientToken } from '../../spotify'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Favorites from "../favorites";
import Feed from "../feed";
import Library from "../library";
import Trending from "../trending";
import Player from "../player";
import './home.css';
import Login from "../auth/login";
import Sidebar from "../../components/sidebar";

export default function Home() {
    const [token, setToken] = useState("");

    useEffect(() => {
        const tokenFromStorage = window.localStorage.getItem("token");
        const hash = window.location.hash;

        if (!tokenFromStorage && hash) {
            const _token = hash.split("&")[0].split("=")[1];
            window.localStorage.setItem("token", _token);
            setToken(_token);
            setClientToken(_token);
        } else {
            setToken(tokenFromStorage);
            setClientToken(tokenFromStorage);
        }

        // Clear the hash from the URL
        window.location.hash = "";
    }, []);

    return !token ? (
        <Login />
    ) : (
        <Router>
            <div className="main-body">
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Library />} />
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/trending" element={<Trending />} />
                    <Route path="/player" element={<Player />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </div>
        </Router>
    );
}
