import { useEffect, useState, useRef } from "react";
import { User, Camera } from "lucide-react";
import UpdatePassword from "./UpdatePassword";
import authApiClient from "../../../services/auth_api_client";
import Loading from "../../Alert/Loading";
import ErrorAlert from "../../Alert/ErrorAlert";
import SuccessAlert from "../../Alert/SuccessAlert";
import useAuthContext from "../../../hooks/useAuthContext";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";

export default function Profile() {
  const { user, updateUserProfile } = useAuthContext();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fileInputRef = useRef(null);

  const { register, handleSubmit, setValue } = useForm();

  // Fetch user data
  useEffect(() => {
    const fetchUsersData = async () => {
      setLoading(true);
      try {
        const response = await authApiClient.get("/accounts/me");
        setUserData(response.data || null);

        if (response.data) {
          Object.keys(response.data).forEach((key) => {
            setValue(key, response.data[key]);
          });
        }
      } catch (err) {
        console.error(err);
        setErrorMsg("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, [setValue]);

  // Profile submit
  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key !== "profile_image") formData.append(key, data[key]);
      });

      if (fileInputRef.current?.files?.[0]) {
        formData.append("profile_image", fileInputRef.current.files[0]);
      }

      await updateUserProfile(formData);
      setSuccessMsg("Profile updated successfully!");
    } catch (err) {
      setErrorMsg(err.response?.data || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Avatar click
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Avatar change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  if (loading && !userData) return <Loading />;

  return (
    <>
    <Helmet>
      <title>Profile</title>
    </Helmet>
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">My Profile</h1>
        <p className="mt-1 text-sm text-zinc-400">Manage your personal information and account settings.</p>
      </div>

      <div className="mx-auto max-w-3xl flex flex-col gap-8">
        {successMsg && <SuccessAlert message={successMsg} />}
        {errorMsg && <ErrorAlert message={errorMsg} />}

        {/* Avatar Section */}
        <div className="flex items-center gap-6 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800 overflow-hidden cursor-pointer" onClick={handleImageClick}>
              {imagePreview || userData?.profile_image ? (
                <img
                  src={imagePreview || `https://res.cloudinary.com/mdarafathossen/${userData.profile_image}`}
                  alt={userData?.first_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-zinc-500" />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-900 bg-red-600 text-white hover:bg-red-700 cursor-pointer" onClick={handleImageClick}>
              <Camera className="h-4 w-4" />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <p className="text-lg font-bold text-white">{userData?.first_name} {userData?.last_name}</p>
            <p className="text-sm text-zinc-400">{user?.email}</p>
            <p className="mt-1 text-xs text-zinc-500">Pro Member since Jan 2025</p>
          </div>
        </div>

        {/* Personal Info Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-lg font-bold text-white">Personal Information</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                First Name
              </label>
              <input
                type="text"
                {...register("first_name")}
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                Last Name
              </label>
              <input
                type="text"
                {...register("last_name")}
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                Email Address
              </label>
              <input disabled type="email" value={user?.email} className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                Phone
              </label>
              <input type="tel" {...register("phone_number")} className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                Date of Birth
              </label>
              <input type="date" {...register("date_of_birth")} className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                Gender
              </label>
              <select {...register("gender")} className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                Fitness Goal
              </label>
              <select {...register("fitnessGoal")} className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100">
                <option value="lose-weight">Lose Weight</option>
                <option value="build-muscle">Build Muscle</option>
                <option value="improve-fitness">Improve Fitness</option>
                <option value="flexibility">Flexibility</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                Height (cm)
              </label>
              <input type="number" {...register("height")} className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                Weight (kg)
              </label>
              <input type="number" {...register("weight")} className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                Emergency Contact
              </label>
              <input type="text" {...register("emergency_contact")} className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                Address
              </label>
              <textarea rows={4} {...register("address")} placeholder="Enter your full address" className="w-full resize-none rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100" />
            </div>
          </div>
          <button disabled={loading} type="submit" className="mt-6 rounded-md bg-red-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white">
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>

        {/* Change Password */}
        <UpdatePassword />
      </div>
    </div>
    </>
  );
}
