"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users } from "@/models/users";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Loader from "@/components/common/Loader";
import DeleteConfirmation from "@/components/FormElements/Alert/DeleteConfirmation";
import { ApiClient } from "@/services/apiClient";
import { ApiResponse } from "@/models/apiResponse";
import { AuthContext } from "../context/authContext";

export default function UserssPage() {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [usersData, setUsersData] = useState<Users[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setShowDeleteModal] = useState(false);
  const [detailId, setDetailId] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response: ApiResponse<Users[] | null> = await ApiClient.get<
        Users[]
      >("users");
      if (response && response?.data) {
        setUsersData(response?.data);
      }
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (id: number) => {
    setDetailId(id);
    setShowDeleteModal(true);
  };
  const handleCloseModal = () => setShowDeleteModal(false);

  const handleDelete = async () => {
    if (detailId > 0) {
      try {
        const response = await ApiClient.delete(`users/${detailId}`);
        console.log(response);
        if (response.success === true) {
          fetchData();
          console.log(response.message);
        } else {
          console.error("Error deleting item:", response.data);
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      } finally {
        setShowDeleteModal(false);
      }
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/users/edit/${id}`);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />

      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex items-center justify-between">
          <span></span>
          <Link
            href="/users/add"
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <span>
              <svg
                className="fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 0C9.44772 0 9 0.447715 9 1V9H1C0.447715 9 0 9.44772 0 10C0 10.5523 0.447715 11 1 11H9V19C9 19.5523 9.44772 20 10 20C10.5523 20 11 19.5523 11 19V11H19C19.5523 11 20 10.5523 20 10C20 9.44772 19.5523 9 19 9H11V1C11 0.447715 10.5523 0 10 0Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            Add New User
          </Link>
        </div>

        {isLoading ? <Loader /> : ""}
        <div className="max-w-full overflow-x-auto pt-5">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[60px] px-4 py-4 font-medium text-black dark:text-white xl:pl-5">
                  Id
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Name
                </th>

                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  Email
                </th>

                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((details, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-5">
                    <p className="text-black dark:text-white">
                      {details.userid}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {details.username}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {details.useremail}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button>
                        <svg
                          className="hover:text-primary"
                          onClick={() => handleEdit(details.userid)}
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.0694 2.94221C14.3546 2.65697 14.8334 2.65697 15.1186 2.94221L21.0578 8.88141C21.343 9.16665 21.343 9.6455 21.0578 9.93074L8.5307 22.4578C8.38777 22.6007 8.19666 22.6865 7.99454 22.6962L3.5058 22.9244C3.04815 22.9466 2.69431 22.594 2.71657 22.1364L2.94482 17.6477C2.9545 17.4455 3.04034 17.2544 3.18327 17.1114L14.0694 2.94221ZM16.2929 5.29289L13.7071 7.87868L15.1213 9.29289L17.7071 6.70711L16.2929 5.29289ZM12.2929 10.7071L14.7071 8.29289L17.2929 10.8787L14.8787 13.2929L12.2929 10.7071ZM4.51472 19.4853L9.36397 18.9724L5.02769 14.6361L4.51472 19.4853ZM4.22183 17.7782L8.07201 21.6284L8.5665 17.2827L4.22183 17.7782Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() => handleOpenModal(details.userid)}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                            fill=""
                          />
                          <path
                            d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                            fill=""
                          />
                          <path
                            d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                            fill=""
                          />
                          <path
                            d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                            fill=""
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDelete}
      />
    </DefaultLayout>
  );
}
