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
} from "lucide-react";

import styles from "./Profile.module.css";
import { useAuth } from "../AuthContext.jsx";

function Profile() {

  const navigate = useNavigate();

  const { logout } = useAuth();

  const [activeTab, setActiveTab] =
    useState("profile");

  const [isEditing, setIsEditing] =
    useState(false);

  // =====================================================
  // USER
  // =====================================================

  const [user, setUser] = useState(() => {

    const savedUser =
      localStorage.getItem(
        "furnitureUser"
      );

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(
        savedUser
      );
    } catch {
      return null;
    }

  });

  const [editUser, setEditUser] =
    useState(user);

  // =====================================================
  // WISHLIST
  // =====================================================

  const [wishlist, setWishlist] =
    useState(() => {

      const savedWishlist =
        localStorage.getItem(
          "wishlist"
        );

      if (!savedWishlist) {
        return [];
      }

      try {
        return JSON.parse(
          savedWishlist
        );
      } catch {
        return [];
      }

    });

  // =====================================================
  // ORDERS
  // =====================================================

  const [orders, setOrders] =
    useState([]);

  // =====================================================
  // LOAD ORDERS
  // =====================================================

  useEffect(() => {

    if (!user) {
      return;
    }

    const ordersKey =
      `orders_${user.email}`;

    const savedOrders =
      localStorage.getItem(
        ordersKey
      );

    if (savedOrders) {

      try {

        setOrders(
          JSON.parse(
            savedOrders
          )
        );

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

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

  }, [wishlist]);

  // =====================================================
  // CHECK USER
  // =====================================================

  useEffect(() => {

    if (!user) {

      navigate(
        "/login",
        { replace: true }
      );

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
  // EDIT
  // =====================================================

  const handleEdit = () => {

    setEditUser({
      ...user,
    });

    setIsEditing(true);

  };

  // =====================================================
  // SAVE
  // =====================================================

  const handleSave = () => {

    setUser({
      ...editUser,
    });

    setIsEditing(false);

  };

  // =====================================================
  // CANCEL
  // =====================================================

  const handleCancel = () => {

    setEditUser({
      ...user,
    });

    setIsEditing(false);

  };

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  // =====================================================
  // IMAGE
  // =====================================================

  const handleImageUpload = (e) => {

    const file =
      e.target.files[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {

      alert(
        "Please select an image file."
      );

      return;
    }

    if (
      file.size >
      2 * 1024 * 1024
    ) {

      alert(
        "Image size should be less than 2MB."
      );

      return;
    }

    const reader =
      new FileReader();

    reader.onloadend = () => {

      setEditUser((prev) => ({
        ...prev,
        image:
          reader.result,
      }));

    };

    reader.readAsDataURL(file);

  };

  // =====================================================
  // REMOVE WISHLIST
  // =====================================================

  const removeFromWishlist = (id) => {

    setWishlist((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    );

  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    // IMPORTANT:
    // logout only removes login session
    // furnitureUser stays in localStorage

    logout();

    navigate(
      "/login",
      { replace: true }
    );

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

      <div
        className={
          styles.profilePage
        }
      >

        {/* ================= HEADER ================= */}

        <section
          className={
            styles.pageHeader
          }
        >

          <div>

            <div
              className={
                styles.breadcrumb
              }
            >

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
              Manage your account and
              personal information.
            </p>

          </div>

        </section>

        {/* ================= CONTAINER ================= */}

        <section
          className={
            styles.profileContainer
          }
        >

          {/* ================= SIDEBAR ================= */}

          <aside
            className={
              styles.sidebar
            }
          >

            {/* USER */}

            <div
              className={
                styles.userBox
              }
            >

              <div
                className={
                  styles.avatarWrapper
                }
              >

                {user.image ? (

                  <img
                    src={
                      user.image
                    }
                    alt="Profile"
                    className={
                      styles.avatarImage
                    }
                  />

                ) : (

                  <div
                    className={
                      styles.avatar
                    }
                  >

                    <User
                      size={42}
                    />

                  </div>

                )}

              </div>

              <h2>
                {user.firstName ||
                  user.name ||
                  ""}{" "}
                {user.lastName ||
                  ""}
              </h2>

              <p>
                {user.email}
              </p>

            </div>

            {/* MENU */}

            <nav
              className={
                styles.menu
              }
            >

              {menuItems.map(
                (item) => {

                  const Icon =
                    item.icon;

                  return (

                    <button
                      key={
                        item.id
                      }
                      className={`
                        ${styles.menuItem}
                        ${
                          activeTab ===
                          item.id
                            ? styles.active
                            : ""
                        }
                      `}
                      onClick={() =>
                        setActiveTab(
                          item.id
                        )
                      }
                    >

                      <Icon
                        size={20}
                      />

                      <span>
                        {
                          item.label
                        }
                      </span>

                      {/* Wishlist count */}

                      {item.id ===
                        "wishlist" &&
                        wishlist.length >
                          0 && (

                          <span
                            className={
                              styles.wishlistCount
                            }
                          >
                            {
                              wishlist.length
                            }
                          </span>

                        )}

                      {/* Orders count */}

                      {item.id ===
                        "orders" &&
                        orders.length >
                          0 && (

                          <span
                            className={
                              styles.wishlistCount
                            }
                          >
                            {
                              orders.length
                            }
                          </span>

                        )}

                    </button>

                  );

                }
              )}

              {/* LOGOUT */}

              <button
                className={`
                  ${styles.menuItem}
                  ${styles.logout}
                `}
                onClick={
                  handleLogout
                }
              >

                <LogOut
                  size={20}
                />

                <span>
                  Logout
                </span>

              </button>

            </nav>

          </aside>

          {/* ================= MAIN ================= */}

          <main
            className={
              styles.mainContent
            }
          >

            {/* ================================================= */}
            {/* PROFILE */}
            {/* ================================================= */}

            {activeTab ===
              "profile" && (

              <>

                <div
                  className={
                    styles.contentHeader
                  }
                >

                  <div>

                    <h2>
                      Personal
                      Information
                    </h2>

                    <p>
                      Update your
                      personal
                      details.
                    </p>

                  </div>

                  {!isEditing ? (

                    <button
                      className={
                        styles.editButton
                      }
                      onClick={
                        handleEdit
                      }
                    >

                      <Edit3
                        size={18}
                      />

                      Edit Profile

                    </button>

                  ) : (

                    <div
                      className={
                        styles.editActions
                      }
                    >

                      <button
                        className={
                          styles.cancelButton
                        }
                        onClick={
                          handleCancel
                        }
                      >
                        Cancel
                      </button>

                      <button
                        className={
                          styles.saveButton
                        }
                        onClick={
                          handleSave
                        }
                      >
                        Save Changes
                      </button>

                    </div>

                  )}

                </div>

                {/* PHOTO */}

                {isEditing && (

                  <div
                    className={
                      styles.photoSection
                    }
                  >

                    <div
                      className={
                        styles.editAvatar
                      }
                    >

                      {editUser?.image ? (

                        <img
                          src={
                            editUser.image
                          }
                          alt="Profile"
                        />

                      ) : (

                        <User
                          size={38}
                        />

                      )}

                    </div>

                    <div>

                      <h3>
                        Profile
                        Picture
                      </h3>

                      <p>
                        Upload a JPG,
                        PNG or WEBP
                        image.
                      </p>

                      <label
                        className={
                          styles.uploadButton
                        }
                      >

                        <Camera
                          size={17}
                        />

                        Choose Image

                        <input
                          type="file"
                          accept="image/*"
                          onChange={
                            handleImageUpload
                          }
                          hidden
                        />

                      </label>

                    </div>

                  </div>

                )}

                {/* FORM */}

                <div
                  className={
                    styles.formGrid
                  }
                >

                  <div
                    className={
                      styles.inputGroup
                    }
                  >

                    <label>
                      First Name
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      value={
                        editUser?.firstName ||
                        editUser?.name ||
                        ""
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        !isEditing
                      }
                    />

                  </div>

                  <div
                    className={
                      styles.inputGroup
                    }
                  >

                    <label>
                      Last Name
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      value={
                        editUser?.lastName ||
                        ""
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        !isEditing
                      }
                    />

                  </div>

                  <div
                    className={
                      styles.inputGroup
                    }
                  >

                    <label>
                      Email Address
                    </label>

                    <div
                      className={
                        styles.inputWithIcon
                      }
                    >

                      <Mail
                        size={18}
                      />

                      <input
                        type="email"
                        name="email"
                        value={
                          editUser?.email ||
                          ""
                        }
                        onChange={
                          handleChange
                        }
                        disabled={
                          !isEditing
                        }
                      />

                    </div>

                  </div>

                  <div
                    className={
                      styles.inputGroup
                    }
                  >

                    <label>
                      Phone Number
                    </label>

                    <div
                      className={
                        styles.inputWithIcon
                      }
                    >

                      <Phone
                        size={18}
                      />

                      <input
                        type="text"
                        name="phone"
                        value={
                          editUser?.phone ||
                          ""
                        }
                        onChange={
                          handleChange
                        }
                        disabled={
                          !isEditing
                        }
                      />

                    </div>

                  </div>

                  <div
                    className={
                      styles.inputGroupFull
                    }
                  >

                    <label>
                      Address
                    </label>

                    <input
                      type="text"
                      name="address"
                      value={
                        editUser?.address ||
                        ""
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        !isEditing
                      }
                    />

                  </div>

                </div>

              </>

            )}

            {/* ================================================= */}
            {/* MY ORDERS */}
            {/* ================================================= */}

            {activeTab ===
              "orders" && (

              <div
                className={
                  styles.wishlistSection
                }
              >

                <div
                  className={
                    styles.contentHeader
                  }
                >

                  <div>

                    <h2>
                      My Orders
                    </h2>

                    <p>
                      View your previous
                      orders.
                    </p>

                  </div>

                  <ShoppingBag
                    size={28}
                  />

                </div>

                {orders.length ===
                0 ? (

                  <div
                    className={
                      styles.emptySection
                    }
                  >

                    <ShoppingBag
                      size={50}
                    />

                    <h2>
                      No Orders Yet
                    </h2>

                    <p>
                      You haven't
                      placed any
                      orders yet.
                    </p>

                  </div>

                ) : (

                  <div
                    className={
                      styles.ordersList
                    }
                  >

                    {orders
                      .slice()
                      .reverse()
                      .map(
                        (order) => (

                          <div
                            key={
                              order.id
                            }
                            className={
                              styles.orderCard
                            }
                          >

                            <div
                              className={
                                styles.orderHeader
                              }
                            >

                              <div>

                                <h3>
                                  Order #
                                  {
                                    order.id
                                  }
                                </h3>

                                <p>
                                  {
                                    order.date
                                  }
                                </p>

                              </div>

                              <span>
                                {
                                  order.status
                                }
                              </span>

                            </div>

                            {/* ITEMS */}

                            <div
                              className={
                                styles.orderItems
                              }
                            >

                              {order.items.map(
                                (
                                  item
                                ) => (

                                  <div
                                    key={
                                      item.id
                                    }
                                    className={
                                      styles.orderItem
                                    }
                                  >

                                    <img
                                      src={
                                        item.image
                                      }
                                      alt={
                                        item.name
                                      }
                                    />

                                    <div>

                                      <h4>
                                        {
                                          item.name
                                        }
                                      </h4>

                                      <p>
                                        Quantity:
                                        {" "}
                                        {
                                          item.quantity
                                        }
                                      </p>

                                      <strong>
                                        $
                                        {(
                                          item.price *
                                          item.quantity
                                        ).toFixed(
                                          2
                                        )}
                                      </strong>

                                    </div>

                                  </div>

                                )
                              )}

                            </div>

                            {/* TOTAL */}

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
                                {order.total.toFixed(
                                  2
                                )}
                              </strong>

                            </div>

                          </div>

                        )
                      )}

                  </div>

                )}

              </div>

            )}

            {/* ================================================= */}
            {/* WISHLIST */}
            {/* ================================================= */}

            {activeTab ===
              "wishlist" && (

              <div
                className={
                  styles.wishlistSection
                }
              >

                <div
                  className={
                    styles.contentHeader
                  }
                >

                  <div>

                    <h2>
                      My Wishlist
                    </h2>

                    <p>
                      Products you saved
                      for later.
                    </p>

                  </div>

                  <Heart
                    size={28}
                    className={
                      styles.heartIcon
                    }
                  />

                </div>

                {wishlist.length ===
                0 ? (

                  <div
                    className={
                      styles.emptySection
                    }
                  >

                    <Heart
                      size={50}
                    />

                    <h2>
                      Your Wishlist
                      is Empty
                    </h2>

                    <p>
                      Start adding
                      products you
                      love.
                    </p>

                  </div>

                ) : (

                  <div
                    className={
                      styles.wishlistGrid
                    }
                  >

                    {wishlist.map(
                      (product) => (

                        <div
                          className={
                            styles.wishlistCard
                          }
                          key={
                            product.id
                          }
                        >

                          <div
                            className={
                              styles.wishlistImage
                            }
                          >

                            <img
                              src={
                                product.image
                              }
                              alt={
                                product.name
                              }
                            />

                          </div>

                          <div
                            className={
                              styles.wishlistInfo
                            }
                          >

                            <h3>
                              {
                                product.name
                              }
                            </h3>

                            <p>
                              $
                              {
                                product.price
                              }
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

                              <Trash2
                                size={16}
                              />

                              Remove

                            </button>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                )}

              </div>

            )}

            {/* ================================================= */}
            {/* ADDRESS */}
            {/* ================================================= */}

            {activeTab ===
              "address" && (

              <div
                className={
                  styles.emptySection
                }
              >

                <MapPin
                  size={50}
                />

                <h2>
                  My Address
                </h2>

                <p>
                  {user.address ||
                    "No address added yet."}
                </p>

              </div>

            )}

            {/* ================================================= */}
            {/* PASSWORD */}
            {/* ================================================= */}

            {activeTab ===
              "password" && (

              <div
                className={
                  styles.passwordSection
                }
              >

                <h2>
                  Change Password
                </h2>

                <p>
                  Keep your account secure
                  by updating your password.
                </p>

                <div
                  className={
                    styles.inputGroup
                  }
                >

                  <label>
                    Current Password
                  </label>

                  <input
                    type="password"
                    placeholder="Current password"
                  />

                </div>

                <div
                  className={
                    styles.inputGroup
                  }
                >

                  <label>
                    New Password
                  </label>

                  <input
                    type="password"
                    placeholder="New password"
                  />

                </div>

                <div
                  className={
                    styles.inputGroup
                  }
                >

                  <label>
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    placeholder="Confirm new password"
                  />

                </div>

                <button
                  className={
                    styles.saveButton
                  }
                >
                  Save Changes
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