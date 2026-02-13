import { useEffect, useState } from "react";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
  fetch("http://localhost:3000/api/user/profile", {
    credentials: "include",
  })
    .then(res => {
      if (!res.ok) {
        window.location.href = "/login";
        throw new Error("Not authenticated");
      }
      return res.json();
    })
    .then(data => {
      setProfile(data);
      setForm({
        firstname: data.firstname || "",
        lastname: data.lastname || "",
        email: data.email || "",
      });
    })
    .catch(err => {
      console.error(err);
    });
}, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstname", form.firstname);
    formData.append("lastname", form.lastname);
    formData.append("email", form.email);

    if (file) {
      formData.append("profileImage", file);
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/user/profile",
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleLogout = async () => {
  try {
    await fetch("http://localhost:3000/api/user/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "/login";
  } catch (error) {
    console.error("Logout error:", error);
  }
};

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>User Profile</h2>

      {profile.profileImage && (
  <>
    <img
      src={`http://localhost:3000/uploads/${profile.profileImage}`}
      alt="Profile"
      width="120"
    />

    <button
      type="button"
      onClick={async () => {
        const formData = new FormData();
        formData.append("removeImage", "true");

        await fetch("http://localhost:3000/api/user/profile", {
          method: "PATCH",
          credentials: "include",
          body: formData,
        });

        window.location.reload();
      }}
      style={{ display: "block", marginTop: "10px" }}
    >
      Remove Image
    </button>
  </>
)}

      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Last Name</label>
          <input
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button type="submit">Update Profile</button>
      </form>
      
      <button 
  onClick={handleLogout} 
  style={{ marginTop: "15px" }}
>
  Logout
</button>
    </div>
  );
}

export default Profile;