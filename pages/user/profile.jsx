import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Link } from "components";
import { alertService, profileService } from "services";
import { getCookie } from "cookies-next";
import { apiUrlProfileSvc } from "config";

export default Profile;

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    list();
  }, []);

  const list = async () => {
    const profileId = getCookie("profile_id");
    console.log("profileId:", profileId);
    const res = await fetch(`${apiUrlProfileSvc}/${profileId}`);
    const data = await res.json();
    console.log("data:", data);
    setProfile(data.profile);
  };

  const isAddMode = !profile;
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    role: Yup.string().required("Role is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .transform((x) => (x === "" ? undefined : x))
      .concat(isAddMode ? Yup.string().required("Password is required") : null)
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .transform((x) => (x === "" ? undefined : x))
      .when("password", (password, schema) => {
        if (password || isAddMode)
          return schema.required("Confirm Password is required");
      })
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if in edit mode
  if (!isAddMode) {
    const { password, confirmPassword, ...defaultValues } = profile;
    formOptions.defaultValues = defaultValues;
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    return isAddMode ? createProfile(data) : updateProfile(profile.id, data);
  }

  async function createProfile(data) {
    return await profileService
      .create({}, data)
      .then(() => {
        alertService.success("Employee profile added", {
          keepAfterRouteChange: true,
        });
        router.push("/profiles");
      })
      .catch(alertService.error);
  }

  async function updateProfile(id, data) {
    return await profileService
      .update(id, {}, data)
      .then(() => {
        alertService.success("Employee profile updated", {
          keepAfterRouteChange: true,
        });
        router.push("/profiles");
      })
      .catch(alertService.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{isAddMode ? "Add Employee" : "Edit Employee"}</h1>
      <div className="form-row">
        <div className="form-group col-max">
          <label>Name</label>
          <input
            name="name"
            type="text"
            {...register("name")}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-max">
          <label>Phone</label>
          <input
            name="phone"
            type="text"
            {...register("phone")}
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.phone?.message}</div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-max">
          <label>Email</label>
          <input
            name="email"
            type="text"
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-max">
          <label>Role</label>
          <select
            name="role"
            {...register("role")}
            className={`form-control ${errors.role ? "is-invalid" : ""}`}
          >
            <option value=""></option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <div className="invalid-feedback">{errors.role?.message}</div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-max">
          <label>Username</label>
          <input
            name="username"
            type="text"
            {...register("username")}
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.username?.message}</div>
        </div>
        <div className="form-group col"></div>
      </div>
      {!isAddMode && (
        <div>
          <h3 className="pt-3">Change Password</h3>
          <p>Leave blank to keep the same password</p>
        </div>
      )}
      <div className="form-row">
        <div className="form-group col-max">
          <label>
            Password
            {!isAddMode &&
              (!showPassword ? (
                <span>
                  {" "}
                  -{" "}
                  <a
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-primary"
                  >
                    Show
                  </a>
                </span>
              ) : (
                <em> - {profile.password}</em>
              ))}
          </label>
          <input
            name="password"
            type="password"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-max">
          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className={`form-control ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">
            {errors.confirmPassword?.message}
          </div>
        </div>
      </div>
      <input
        name="profile_picture"
        value={"profile.img"}
        type="hidden"
        {...register("profile_picture")}
        className={`form-control ${errors.profile_picture ? "is-invalid" : ""}`}
      />
      <div className="form-group">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="btn btn-primary mr-2"
        >
          {formState.isSubmitting && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Save
        </button>
        <button
          onClick={() => reset(formOptions.defaultValues)}
          type="button"
          disabled={formState.isSubmitting}
          className="btn btn-secondary"
        >
          Reset
        </button>
        <Link href="/profiles" className="btn btn-link">
          Cancel
        </Link>
      </div>
    </form>
  );
}
