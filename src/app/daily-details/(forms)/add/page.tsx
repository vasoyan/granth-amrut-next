"use client";

import { useContext, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loader from "@/components/common/Loader";
import { DailyDetail } from "@/models/dailyDetail";
import { ApiClient } from "@/services/apiClient";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/authContext";

export default function AddPage() {
  const authContext = useContext(AuthContext);
  // Initialize state for each checkbox
  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({
    flagpadharamni: false,
    flagsabha: false,
    flagthal: false,
    flagavd: false,
    flagtelegram: false,
    flagpatrikaapp: false,
    flagparamrutapp: false,
    flagvicharanapp: false,
    flagsuhradapp: false,
    flagprivate: false,
    flagcalendar: false,
    flagai: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<DailyDetail>({
    infoid: 0,
  });
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setFormData((prevState) => ({
      ...prevState,
      userid: authContext?.user?.userid,
    }));

    const combinedData = { ...formData, ...checkboxes };
    const { infoid, ...insertData } = combinedData;

    const response = await ApiClient.post<DailyDetail>(
      "daily-detail",
      insertData
    );

    if (response.success) {
      setIsLoading(false);
      router.push("/daily-details");
    } else {
      console.error("Failed to insert data");
    }
    setIsLoading(false);
  };

  const handleCancel = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/daily-details");
  };

  // Handle change event
  const handleCheckboxChange = (id: string) => {
    setCheckboxes((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Render the checkbox components
  const renderCheckbox = (id: string, text: string) => (
    <CheckboxOne
      key={id}
      id={id}
      text={text}
      isChecked={checkboxes[id]}
      onChange={() => handleCheckboxChange(id)}
    />
  );

  // Handle change event
  const handleDatepickerChange = (selectedDates: Date[], dateStr: string) => {
    if (selectedDates.length > 0) {
      const infodate = selectedDates[0];
      const infoyear = infodate.getFullYear();
      const infomonth = infodate.getMonth() + 1; // Months are 0-based in JS
      const infoday = infodate.getDate();

      setFormData((prevState) => ({
        ...prevState,
        infodate,
        infoyear,
        infomonth,
        infoday,
      }));
    } else {
      // If no date is selected, reset the date fields
      setFormData((prevState) => ({
        ...prevState,
        infodate: null,
        infoyear: null,
        infomonth: null,
        infoday: null,
      }));
    }
    // console.log("Selected date:", dateStr);
  };

  // Render the checkbox components
  const renderDatepicker = (id: string, text: string) => (
    <DatePickerOne
      key={id}
      id={id}
      text={text}
      onChange={handleDatepickerChange}
    />
  );

  return (
    <DefaultLayout>
      {isLoading ? <Loader /> : ""}
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Add" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-5">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Daily Detail
                </h3>
              </div>
              <div className="p-7">
                <form method="POST">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/4">
                      {renderDatepicker("infodate", "Select Date")}
                    </div>
                    <div className="w-full sm:w-1/4">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="place"
                      >
                        Place
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="place"
                        id="place"
                        value={formData?.place ?? ""}
                        onChange={handleInputChange}
                        placeholder="Write Place Ex. Nirnaynagar"
                      />
                    </div>
                    <div className="w-full sm:w-1/4">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="city"
                      >
                        City
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="city"
                        id="city"
                        value={formData?.city ?? ""}
                        onChange={handleInputChange}
                        placeholder="Write city Ex. Ahmedabad"
                      />
                    </div>
                    <div className="w-full sm:w-1/4">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="pradesh"
                      >
                        Pradesh
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="pradesh"
                        id="pradesh"
                        value={formData?.pradesh ?? ""}
                        onChange={handleInputChange}
                        placeholder="Write Pradesh Ex. Harimay"
                      />
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="shortdescguj"
                        >
                          Short Description Gujarati
                        </label>
                        <div className="relative">
                          <span className="absolute left-4.5 top-4">
                            <svg
                              className="fill-current"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                                  fill=""
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                                  fill=""
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_88_10224">
                                  <rect width="20" height="20" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>

                          <textarea
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            name="shortdescguj"
                            id="shortdescguj"
                            rows={4}
                            value={formData?.shortdescguj ?? ""}
                            onChange={handleInputChange}
                            placeholder="Write Short Description Gujarati"
                          ></textarea>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-1/2">
                          <div className="p-3">
                            {renderCheckbox("flagsabha", "Sabha")}
                          </div>
                          <div className="p-3">
                            {renderCheckbox("flagpadharamni", "Padharamni")}
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                          <div className="p-3">
                            {renderCheckbox("flagthal", "Thal")}
                          </div>
                          <div className="p-3">
                            {renderCheckbox("flagavd", "AVD")}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-1/2">
                          <div className="p-3">
                            {renderCheckbox("flagcalendar", "Calendar")}
                          </div>
                          <div className="p-3">
                            {renderCheckbox("flagpatrikaapp", "Patrika App")}
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                          <div className="p-3">
                            {renderCheckbox("flagprivate", "Private")}
                          </div>
                          <div className="p-3">
                            {renderCheckbox("flagvicharanapp", "Vicharan App")}
                          </div>
                        </div>
                      </div>
                      <div className="mb-5.5 flex flex-col sm:flex-row">
                        <div className="w-full sm:w-1/2">
                          <div className="p-3">
                            {renderCheckbox("flagsuhradapp", "Suhrad App")}
                          </div>
                          <div className="p-3">
                            {renderCheckbox("flagparamrutapp", "Paramrut App")}
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                          <div className="p-3">
                            {renderCheckbox("flagtelegram", "Telegram")}
                          </div>
                          <div className="p-3">
                            {renderCheckbox("flagai", "AI")}
                          </div>
                        </div>
                      </div>
                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="videourl"
                        >
                          Video url
                        </label>

                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="url"
                          name="videourl"
                          id="videourl"
                          value={formData?.videourl ?? ""}
                          onChange={handleInputChange}
                          placeholder="https://youtu.be/TyjAFbzZCig?si=AHyx-XsIyDqR768c"
                        />
                      </div>
                      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/2">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="placelatt"
                          >
                            Latitude
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="placelatt"
                            id="placelatt"
                            value={formData?.placelatt ?? ""}
                            onChange={handleInputChange}
                            placeholder="Write Latitude Ex. 52.58885548"
                          />
                        </div>
                        <div className="w-full sm:w-1/2">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="placelong"
                          >
                            Longitude
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="placelong"
                            id="placelong"
                            value={formData?.placelong ?? ""}
                            onChange={handleInputChange}
                            placeholder="Write Longitude Ex. -0.401187594"
                          />
                        </div>
                      </div>
                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="longdesc"
                        >
                          Long Description
                        </label>
                        <div className="relative">
                          <span className="absolute left-4.5 top-4">
                            <svg
                              className="fill-current"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                                  fill=""
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                                  fill=""
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_88_10224">
                                  <rect width="20" height="20" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>

                          <textarea
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            name="longdesc"
                            id="longdesc"
                            rows={10}
                            value={formData?.longdesc ?? ""}
                            onChange={handleInputChange}
                            placeholder="Write Long Description"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="photourl"
                        >
                          Photo url
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="url"
                          name="photourl"
                          id="photourl"
                          value={formData?.photourl ?? ""}
                          onChange={handleInputChange}
                          placeholder="https://youtu.be/TyjAFbzZCig?si=AHyx-XsIyDqR768c"
                        />
                      </div>
                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="audioref"
                        >
                          Audio ref
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="url"
                          name="audioref"
                          id="audioref"
                          value={formData?.audioref ?? ""}
                          onChange={handleInputChange}
                          placeholder="https://youtu.be/TyjAFbzZCig?si=AHyx-XsIyDqR768c"
                        />
                      </div>

                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="shortdeschindi"
                        >
                          Short Description Hindi
                        </label>
                        <div className="relative">
                          <span className="absolute left-4.5 top-4">
                            <svg
                              className="fill-current"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                                  fill=""
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                                  fill=""
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_88_10224">
                                  <rect width="20" height="20" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>

                          <textarea
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            name="shortdeschindi"
                            id="shortdeschindi"
                            rows={2}
                            value={formData?.shortdeschindi ?? ""}
                            onChange={handleInputChange}
                            placeholder="Write Short Description Hindi"
                          ></textarea>
                        </div>
                      </div>
                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="shortdesceng"
                        >
                          Short Description English
                        </label>
                        <div className="relative">
                          <span className="absolute left-4.5 top-4">
                            <svg
                              className="fill-current"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                                  fill=""
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                                  fill=""
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_88_10224">
                                  <rect width="20" height="20" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>

                          <textarea
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            name="shortdesceng"
                            id="shortdesceng"
                            rows={2}
                            value={formData?.shortdesceng ?? ""}
                            onChange={handleInputChange}
                            placeholder="Write Short Description English"
                          ></textarea>
                        </div>
                      </div>
                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="extrafield1"
                        >
                          Extra field 1
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="extrafield1"
                          id="extrafield1"
                          value={formData?.extrafield1 ?? ""}
                          onChange={handleInputChange}
                          placeholder="Write Extra field 1"
                        />
                      </div>
                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="extrafield2"
                        >
                          Extra field 2
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="extrafield2"
                          id="extrafield2"
                          value={formData?.extrafield2 ?? ""}
                          onChange={handleInputChange}
                          placeholder="Write Extra field 2"
                        />
                      </div>
                      <div className="">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="remark"
                        >
                          Remarks
                        </label>
                        <textarea
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          name="remark"
                          id="remark"
                          rows={5}
                          value={formData?.remark ?? ""}
                          onChange={handleInputChange}
                          placeholder="Write Remark"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  {/* 95 106 181 */}
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="inline-flex items-center justify-center rounded-md bg-blue-900 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                      type="reset"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
