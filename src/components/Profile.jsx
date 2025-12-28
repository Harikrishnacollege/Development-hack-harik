import React from "react";
import "../Styles/Profile.css";

const Profile = () => {
    return (
        <div className="profile-layout">
            {/* LEFT STRIP */}
            <aside className="profile-rail">
                <div className="avatar-container">
                    <img
                        src="https://i.pravatar.cc/200?img=32"
                        alt="avatar"
                        className="avatar"
                    />
                </div>

                <h2 className="username">takshak_s</h2>
                <span className="rail-accent" />
            </aside>

            {/* RIGHT CONTENT */}
            <main className="profile-content">
                <section className="profile-section">
                    <h3>Bio</h3>
                    <p>
                        Curious learner • Building useful platforms • Exploring full-stack
                        development.
                    </p>
                </section>

                <section className="profile-section info">
                    <div>
                        <span className="label">Email</span>
                        <span className="value">takshak@gmail.com</span>
                    </div>
                    <div>
                        <span className="label">Mobile</span>
                        <span className="value">+91 98765 43210</span>
                    </div>
                </section>

                <section className="profile-section">
                    <h1>
                        Hello world
                    </h1>
                </section>
                <section className="profile-section">
                    <h1>
                        Hello world
                    </h1>
                </section>

                <section className="profile-actions">
                    <button className="btn primary">Edit Bio</button>
                    <button className="btn outline">Logout</button>
                </section>
            </main>
        </div>
    );
};

export default Profile;
