
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar.jsx";

import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Lock,
  LogOut,
  Edit3,
  Mail,
  Phone,
  Camera,
  Trash2,
  Save,
  X,
  Eye,
  EyeOff,
} from "lucide-react";

import styles from "./Profile.module.css";
import { useAuth } from "../AuthContext.jsx";

function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // =====================================================
  // ACTIVE TAB
  // =====================================================

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  // Profile success message
  const [profileSuccess, setProfileSuccess] = useState("");

  // =====================================================
  // USER
  // =====================================================

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("furnitureUser");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch {
      return null;
    }
  });

  const [editUser, setEditUser] = useState(user);

  // =====================================================
  // WISHLIST
  // =====================================================

  const [wishlist, setWishlist] = useState(() => {
    const savedUser = localStorage.getItem("furnitureUser");

    if (!savedUser) {
      return [];
    }

    try {
      const parsedUser = JSON.parse(savedUser);

      if (!parsedUser?.email) {
        return [];
      }

      const wishlistKey =
        `wishlist_${parsedUser.email.toLowerCase()}`;

      const savedWishlist =
        localStorage.getItem(wishlistKey);

      if (!savedWishlist) {
        return [];
      }

      return JSON.parse(savedWishlist);
    } catch {
      return [];
    }
  });

  // =====================================================
  // ORDERS
  // =====================================================

  const [orders, setOrders] = useState([]);

  // =====================================================
  // PASSWORD
  // =====================================================

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // =====================================================
  // LOAD ORDERS
  // =====================================================

  useEffect(() => {
    if (!user?.email) {
      setOrders([]);
      return;
    }

    const ordersKey =
      `orders_${user.email.toLowerCase()}`;

    const savedOrders =
      localStorage.getItem(ordersKey);

    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch {
        setOrders([]);
      }
    } else {
      setOrders([]);
    }
  }, [user]);

  // =====================================================
  // SAVE USER
  // =====================================================

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "furnitureUser",
        JSON.stringify(user)
      );
    }
  }, [user]);

  // =====================================================
  // SAVE WISHLIST
  // =====================================================

  useEffect(() => {
    if (!user?.email) {
      return;
    }

    const wishlistKey =
      `wishlist_${user.email.toLowerCase()}`;

    localStorage.setItem(
      wishlistKey,
      JSON.stringify(wishlist)
    );
  }, [wishlist, user]);

  // =====================================================
  // CHECK USER
  // =====================================================

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true";

    if (!user || !isLoggedIn) {
      navigate("/login", {
        replace: true,
      });
    }
  }, [user, navigate]);

  // =====================================================
  // MENU
  // =====================================================

  const menuItems = [
    {
      id: "profile",
      label: "My Profile",
      icon: User,
    },
    {
      id: "orders",
      label: "My Orders",
      icon: ShoppingBag,
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: Heart,
    },
    {
      id: "address",
      label: "My Address",
      icon: MapPin,
    },
    {
      id: "password",
      label: "Change Password",
      icon: Lock,
    },
  ];

  // =====================================================
  // EDIT PROFILE
  // =====================================================

  const handleEdit = () => {
    setEditUser({
      ...user,
    });

    setProfileSuccess("");
    setIsEditing(true);
  };

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSave = () => {
    if (!editUser) {
      return;
    }

    const firstName =
      editUser.firstName?.trim() || "";

    const lastName =
      editUser.lastName?.trim() || "";

    const email =
      editUser.email?.trim().toLowerCase() || "";

    if (!firstName) {
      alert("Please enter your first name.");
      return;
    }

    if (!lastName) {
      alert("Please enter your last name.");
      return;
    }

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    const updatedUser = {
      ...editUser,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone: editUser.phone?.trim() || "",
      address: editUser.address?.trim() || "",
    };

    // =================================================
    // UPDATE furnitureUsers
    // =================================================

    const savedUsers =
      localStorage.getItem("furnitureUsers");

    if (savedUsers) {
      try {
        const users = JSON.parse(savedUsers);

        const updatedUsers = users.map((item) => {
          if (
            item.email?.toLowerCase() ===
            user.email?.toLowerCase()
          ) {
            return updatedUser;
          }

          return item;
        });

        localStorage.setItem(
          "furnitureUsers",
          JSON.stringify(updatedUsers)
        );
      } catch {
        console.log("Could not update users.");
      }
    }

    // =================================================
    // UPDATE WISHLIST KEY IF EMAIL CHANGED
    // =================================================

    if (
      user.email?.toLowerCase() !==
      email.toLowerCase()
    ) {
      const oldWishlistKey =
        `wishlist_${user.email.toLowerCase()}`;

      const newWishlistKey =
        `wishlist_${email.toLowerCase()}`;

      const oldWishlist =
        localStorage.getItem(oldWishlistKey);

      if (oldWishlist) {
        localStorage.setItem(
          newWishlistKey,
          oldWishlist
        );

        localStorage.removeItem(oldWishlistKey);
      }
    }

    // =================================================
    // UPDATE CURRENT USER
    // =================================================

    localStorage.setItem(
      "furnitureUser",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
    setEditUser(updatedUser);
    setIsEditing(false);

    window.dispatchEvent(
      new Event("userUpdated")
    );

    // Show success message instead of alert
    setProfileSuccess(
      "Profile updated successfully!"
    );
  };

  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const handleCancel = () => {
    setEditUser({
      ...user,
    });

    setProfileSuccess("");
    setIsEditing(false);
  };

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Hide success message when editing again
    setProfileSuccess("");
  };

  // =====================================================
  // IMAGE UPLOAD
  // =====================================================

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setEditUser((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  // =====================================================
  // REMOVE FROM WISHLIST
  // =====================================================

  const removeFromWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  const handleChangePassword = () => {
    const errors = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword =
        "Please enter your current password.";
    }

    if (!passwordData.newPassword) {
      errors.newPassword =
        "Please enter a new password.";
    } else if (
      passwordData.newPassword.length < 6
    ) {
      errors.newPassword =
        "Password must be at least 6 characters.";
    }

    if (!passwordData.confirmPassword) {
      errors.confirmPassword =
        "Please confirm your new password.";
    } else if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      errors.confirmPassword =
        "Passwords do not match.";
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      setPasswordSuccess("");
      return;
    }

    // =================================================
    // CHECK CURRENT PASSWORD
    // =================================================

    if (
      passwordData.currentPassword !==
      user.password
    ) {
      setPasswordErrors({
        currentPassword:
          "Current password is incorrect.",
      });

      setPasswordSuccess("");
      return;
    }

    // =================================================
    // CHECK NEW PASSWORD
    // =================================================

    if (
      passwordData.newPassword ===
      user.password
    ) {
      setPasswordErrors({
        newPassword:
          "New password must be different from your current password.",
      });

      setPasswordSuccess("");
      return;
    }

    // =================================================
    // UPDATE USER
    // =================================================

    const updatedUser = {
      ...user,
      password:
        passwordData.newPassword,
    };

    // Save current user
    localStorage.setItem(
      "furnitureUser",
      JSON.stringify(updatedUser)
    );

    // Update users array
    const savedUsers =
      localStorage.getItem("furnitureUsers");

    if (savedUsers) {
      try {
        const users = JSON.parse(savedUsers);

        const updatedUsers = users.map((item) => {
          if (
            item.email?.toLowerCase() ===
            user.email?.toLowerCase()
          ) {
            return updatedUser;
          }

          return item;
        });

        localStorage.setItem(
          "furnitureUsers",
          JSON.stringify(updatedUsers)
        );
      } catch {
        console.log(
          "Could not update password."
        );
      }
    }

    // Update state
    setUser(updatedUser);

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setPasswordErrors({});

    setPasswordSuccess(
      "Password changed successfully!"
    );
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  // =====================================================
  // NO USER
  // =====================================================

  if (!user) {
    return null;
  }

  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <div className={styles.profilePage}>

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <section className={styles.pageHeader}>

          <div>

            <div className={styles.breadcrumb}>

              <span>
                Home
              </span>

              <span>
                /
              </span>

              <span>
                Profile
              </span>

            </div>

            <h1>
              My Profile
            </h1>

            <p>
              Manage your account and personal information.
            </p>

          </div>

        </section>

        {/* ================================================= */}
        {/* CONTAINER */}
        {/* ================================================= */}

        <section className={styles.profileContainer}>

          {/* ================================================= */}
          {/* SIDEBAR */}
          {/* ================================================= */}

          <aside className={styles.sidebar}>

            {/* USER BOX */}

            <div className={styles.userBox}>

              <div className={styles.avatarWrapper}>

                {user.image ? (

                  <img
                    src={user.image}
                    alt="Profile"
                    className={styles.avatarImage}
                  />

                ) : (

                  <div className={styles.avatar}>

                    <User size={42} />

                  </div>

                )}

              </div>

              <h2>
                {user.firstName ||
                  user.name ||
                  ""}{" "}
                {user.lastName || ""}
              </h2>

              <p>
                {user.email}
              </p>

            </div>

            {/* MENU */}

            <nav className={styles.menu}>

              {menuItems.map((item) => {

                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    className={`
                      ${styles.menuItem}
                      ${
                        activeTab === item.id
                          ? styles.active
                          : ""
                      }
                    `}
                    onClick={() => {
                      setActiveTab(item.id);

                      if (item.id === "password") {
                        setPasswordErrors({});
                        setPasswordSuccess("");
                      }

                      if (item.id !== "profile") {
                        setProfileSuccess("");
                      }
                    }}
                  >

                    <Icon size={20} />

                    <span>
                      {item.label}
                    </span>

                    {item.id === "wishlist" &&
                      wishlist.length > 0 && (

                        <span
                          className={
                            styles.wishlistCount
                          }
                        >
                          {wishlist.length}
                        </span>

                      )}

                    {item.id === "orders" &&
                      orders.length > 0 && (

                        <span
                          className={
                            styles.wishlistCount
                          }
                        >
                          {orders.length}
                        </span>

                      )}

                  </button>
                );
              })}

              {/* LOGOUT */}

              <button
                className={`
                  ${styles.menuItem}
                  ${styles.logout}
                `}
                onClick={handleLogout}
              >

                <LogOut size={20} />

                <span>
                  Logout
                </span>

              </button>

            </nav>

          </aside>

          {/* ================================================= */}
          {/* MAIN CONTENT */}
          {/* ================================================= */}

          <main className={styles.mainContent}>

            {/* ================================================= */}
            {/* PROFILE */}
            {/* ================================================= */}

            {activeTab === "profile" && (
              <>

                <div className={styles.contentHeader}>

                  <div>

                    <h2>
                      Personal Information
                    </h2>

                    <p>
                      Update your personal details.
                    </p>

                  </div>

                  {!isEditing ? (

                    <button
                      className={styles.editButton}
                      onClick={handleEdit}
                    >

                      <Edit3 size={18} />

                      Edit Profile

                    </button>

                  ) : (

                    <div className={styles.editActions}>

                      <button
                        className={styles.cancelButton}
                        onClick={handleCancel}
                      >

                        <X size={18} />

                        Cancel

                      </button>

                      <button
                        className={styles.saveButton}
                        onClick={handleSave}
                      >

                        <Save size={18} />

                        Save Changes

                      </button>

                    </div>

                  )}

                </div>

                {/* PROFILE SUCCESS MESSAGE */}

                {profileSuccess && (

                  <div
                    className={
                      styles.passwordSuccess
                    }
                  >

                    ✓ {profileSuccess}

                  </div>

                )}

                {/* PHOTO */}

                {isEditing && (

                  <div className={styles.photoSection}>

                    <div className={styles.editAvatar}>

                      {editUser?.image ? (

                        <img
                          src={editUser.image}
                          alt="Profile"
                        />

                      ) : (

                        <User size={38} />

                      )}

                    </div>

                    <div>

                      <h3>
                        Profile Picture
                      </h3>

                      <p>
                        Upload a JPG, PNG or WEBP image.
                      </p>

                      <label
                        className={
                          styles.uploadButton
                        }
                      >

                        <Camera size={17} />

                        Choose Image

                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          hidden
                        />

                      </label>

                    </div>

                  </div>

                )}

                {/* FORM */}

                <div className={styles.formGrid}>

                  {/* FIRST NAME */}

                  <div className={styles.inputGroup}>

                    <label>
                      First Name
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      value={
                        editUser?.firstName || ""
                      }
                      onChange={handleChange}
                      disabled={!isEditing}
                    />

                  </div>

                  {/* LAST NAME */}

                  <div className={styles.inputGroup}>

                    <label>
                      Last Name
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      value={
                        editUser?.lastName || ""
                      }
                      onChange={handleChange}
                      disabled={!isEditing}
                    />

                  </div>

                  {/* EMAIL */}

                  <div className={styles.inputGroup}>

                    <label>
                      Email Address
                    </label>

                    <div
                      className={
                        styles.inputWithIcon
                      }
                    >

                      <Mail size={18} />

                      <input
                        type="email"
                        name="email"
                        value={
                          editUser?.email || ""
                        }
                        onChange={handleChange}
                        disabled={!isEditing}
                      />

                    </div>

                  </div>

                  {/* PHONE */}

                  <div className={styles.inputGroup}>

                    <label>
                      Phone Number
                    </label>

                    <div
                      className={
                        styles.inputWithIcon
                      }
                    >

                      <Phone size={18} />

                      <input
                        type="text"
                        name="phone"
                        value={
                          editUser?.phone || ""
                        }
                        onChange={handleChange}
                        disabled={!isEditing}
                      />

                    </div>

                  </div>

                  {/* ADDRESS */}

                  <div
                    className={
                      styles.inputGroupFull
                    }
                  >

                    <label>
                      Address
                    </label>

                    <div
                      className={
                        styles.inputWithIcon
                      }
                    >

                      <MapPin size={18} />

                      <input
                        type="text"
                        name="address"
                        value={
                          editUser?.address || ""
                        }
                        onChange={handleChange}
                        disabled={!isEditing}
                      />

                    </div>

                  </div>

                </div>

              </>
            )}

            {/* ================================================= */}
            {/* ORDERS */}
            {/* ================================================= */}

            {activeTab === "orders" && (

              <div className={styles.wishlistSection}>

                <div className={styles.contentHeader}>

                  <div>

                    <h2>
                      My Orders
                    </h2>

                    <p>
                      View your previous orders.
                    </p>

                  </div>

                  <ShoppingBag size={28} />

                </div>

                {orders.length === 0 ? (

                  <div className={styles.emptySection}>

                    <ShoppingBag size={50} />

                    <h2>
                      No Orders Yet
                    </h2>

                    <p>
                      You haven't placed any orders yet.
                    </p>

                    <button
                      className={styles.saveButton}
                      onClick={() =>
                        navigate("/shop")
                      }
                    >
                      Browse Products
                    </button>

                  </div>

                ) : (

                  <div className={styles.ordersList}>

                    {orders
                      .slice()
                      .reverse()
                      .map((order) => (

                        <div
                          key={order.id}
                          className={styles.orderCard}
                        >

                          <div
                            className={
                              styles.orderHeader
                            }
                          >

                            <div>

                              <h3>
                                Order #{order.id}
                              </h3>

                              <p>
                                {order.date}
                              </p>

                            </div>

                            <span>
                              {order.status ||
                                "Pending"}
                            </span>

                          </div>

                          <div
                            className={
                              styles.orderItems
                            }
                          >

                            {order.items?.map(
                              (item) => (

                                <div
                                  key={item.id}
                                  className={
                                    styles.orderItem
                                  }
                                >

                                  <img
                                    src={item.image}
                                    alt={item.name}
                                  />

                                  <div>

                                    <h4>
                                      {item.name}
                                    </h4>

                                    <p>
                                      Quantity:{" "}
                                      {item.quantity}
                                    </p>

                                    <strong>
                                      $
                                      {(
                                        Number(
                                          item.price
                                        ) *
                                        Number(
                                          item.quantity
                                        )
                                      ).toFixed(2)}
                                    </strong>

                                  </div>

                                </div>

                              )
                            )}

                          </div>

                          <div
                            className={
                              styles.orderTotal
                            }
                          >

                            <span>
                              Total
                            </span>

                            <strong>
                              $
                              {Number(
                                order.total || 0
                              ).toFixed(2)}
                            </strong>

                          </div>

                        </div>

                      ))}

                  </div>

                )}

              </div>

            )}

            {/* ================================================= */}
            {/* WISHLIST */}
            {/* ================================================= */}

            {activeTab === "wishlist" && (

              <div className={styles.wishlistSection}>

                <div className={styles.contentHeader}>

                  <div>

                    <h2>
                      My Wishlist
                    </h2>

                    <p>
                      Products you saved for later.
                    </p>

                  </div>

                  <Heart
                    size={28}
                    className={styles.heartIcon}
                  />

                </div>

                {wishlist.length === 0 ? (

                  <div className={styles.emptySection}>

                    <Heart size={50} />

                    <h2>
                      Your Wishlist is Empty
                    </h2>

                    <p>
                      Start adding products you love.
                    </p>

                    <button
                      className={styles.saveButton}
                      onClick={() =>
                        navigate("/shop")
                      }
                    >
                      Browse Products
                    </button>

                  </div>

                ) : (

                  <div className={styles.wishlistGrid}>

                    {wishlist.map((product) => (

                      <div
                        className={
                          styles.wishlistCard
                        }
                        key={product.id}
                      >

                        <div
                          className={
                            styles.wishlistImage
                          }
                        >

                          <img
                            src={product.image}
                            alt={product.name}
                          />

                        </div>

                        <div
                          className={
                            styles.wishlistInfo
                          }
                        >

                          <h3>
                            {product.name}
                          </h3>

                          <p>
                            ${product.price}
                          </p>

                          <button
                            onClick={() =>
                              removeFromWishlist(
                                product.id
                              )
                            }
                            className={
                              styles.removeWishlist
                            }
                          >

                            <Trash2 size={16} />

                            Remove

                          </button>

                        </div>

                      </div>

                    ))}

                  </div>

                )}

              </div>

            )}

            {/* ================================================= */}
            {/* ADDRESS */}
            {/* ================================================= */}

            {activeTab === "address" && (

              <div className={styles.wishlistSection}>

                <div className={styles.contentHeader}>

                  <div>

                    <h2>
                      My Address
                    </h2>

                    <p>
                      Your saved delivery address.
                    </p>

                  </div>

                  <MapPin size={28} />

                </div>

                <div className={styles.addressCard}>

                  <MapPin size={25} />

                  <div>

                    <h3>
                      Delivery Address
                    </h3>

                    <p>
                      {user.address ||
                        "No address added yet."}
                    </p>

                  </div>

                </div>

              </div>

            )}

            {/* ================================================= */}
            {/* PASSWORD */}
            {/* ================================================= */}

            {activeTab === "password" && (

              <div
                className={
                  styles.passwordSection
                }
              >

                <div
                  className={
                    styles.contentHeader
                  }
                >

                  <div>

                    <h2>
                      Change Password
                    </h2>

                    <p>
                      Keep your account secure by
                      updating your password.
                    </p>

                  </div>

                  <Lock size={28} />

                </div>

                {passwordSuccess && (

                  <div
                    className={
                      styles.passwordSuccess
                    }
                  >

                    ✓ {passwordSuccess}

                  </div>

                )}

                {/* CURRENT PASSWORD */}

                <div
                  className={
                    styles.inputGroup
                  }
                >

                  <label>
                    Current Password
                  </label>

                  <div
                    className={
                      styles.inputWithIcon
                    }
                  >

                    <Lock size={18} />

                    <input
                      type={
                        showCurrentPassword
                          ? "text"
                          : "password"
                      }
                      value={
                        passwordData.currentPassword
                      }
                      placeholder="Current password"
                      onChange={(e) => {

                        setPasswordData({
                          ...passwordData,
                          currentPassword:
                            e.target.value,
                        });

                        setPasswordErrors({
                          ...passwordErrors,
                          currentPassword: "",
                        });

                        setPasswordSuccess("");

                      }}
                    />

                    <button
                      type="button"
                      className={
                        styles.passwordToggle
                      }
                      onClick={() =>
                        setShowCurrentPassword(
                          !showCurrentPassword
                        )
                      }
                    >

                      {showCurrentPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}

                    </button>

                  </div>

                  {passwordErrors.currentPassword && (

                    <p
                      className={
                        styles.error
                      }
                    >
                      {
                        passwordErrors.currentPassword
                      }
                    </p>

                  )}

                </div>

                {/* NEW PASSWORD */}

                <div
                  className={
                    styles.inputGroup
                  }
                >

                  <label>
                    New Password
                  </label>

                  <div
                    className={
                      styles.inputWithIcon
                    }
                  >

                    <Lock size={18} />

                    <input
                      type={
                        showNewPassword
                          ? "text"
                          : "password"
                      }
                      value={
                        passwordData.newPassword
                      }
                      placeholder="New password"
                      onChange={(e) => {

                        setPasswordData({
                          ...passwordData,
                          newPassword:
                            e.target.value,
                        });

                        setPasswordErrors({
                          ...passwordErrors,
                          newPassword: "",
                        });

                        setPasswordSuccess("");

                      }}
                    />

                    <button
                      type="button"
                      className={
                        styles.passwordToggle
                      }
                      onClick={() =>
                        setShowNewPassword(
                          !showNewPassword
                        )
                      }
                    >

                      {showNewPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}

                    </button>

                  </div>

                  {passwordErrors.newPassword && (

                    <p
                      className={
                        styles.error
                      }
                    >
                      {
                        passwordErrors.newPassword
                      }
                    </p>

                  )}

                </div>

                {/* CONFIRM PASSWORD */}

                <div
                  className={
                    styles.inputGroup
                  }
                >

                  <label>
                    Confirm Password
                  </label>

                  <div
                    className={
                      styles.inputWithIcon
                    }
                  >

                    <Lock size={18} />

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={
                        passwordData.confirmPassword
                      }
                      placeholder="Confirm new password"
                      onChange={(e) => {

                        setPasswordData({
                          ...passwordData,
                          confirmPassword:
                            e.target.value,
                        });

                        setPasswordErrors({
                          ...passwordErrors,
                          confirmPassword: "",
                        });

                        setPasswordSuccess("");

                      }}
                    />

                    <button
                      type="button"
                      className={
                        styles.passwordToggle
                      }
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                    >

                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}

                    </button>

                  </div>

                  {passwordErrors.confirmPassword && (

                    <p
                      className={
                        styles.error
                      }
                    >
                      {
                        passwordErrors.confirmPassword
                      }
                    </p>

                  )}

                </div>

                <button
                  type="button"
                  className={
                    styles.saveButton
                  }
                  onClick={
                    handleChangePassword
                  }
                >

                  <Lock size={17} />

                  Change Password

                </button>

              </div>

            )}

          </main>

        </section>

      </div>

      <Footer />
    </>
  );
}

export default Profile;
