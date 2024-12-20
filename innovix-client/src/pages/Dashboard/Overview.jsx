import useUserData from "./../../hooks/useUserData";

const Overview = () => {
  const { userData } = useUserData();
  console.log(userData);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full">
      {/* Diff */}
      <div className="w-full h-full">
        <div className="diff aspect-[16/9]">
          <div className="diff-item-1">
            <div className="bg-transparent text-primary-content grid place-content-center text-9xl font-black">
              <h2 className="title">
                WELCOME TO {userData?.name}&apos;S PROFILE!!!
              </h2>
              {/* photo */}
              <div className="flex justify-center items-center mt-8">
                <div className="avatar online">
                  <div className="w-40 rounded-full">
                    <img src={userData.photoURL} />
                  </div>
                </div>
              </div>

              {/* baddges */}

              <div className="flex flex-col justify-center items-center mt-5 gap-5">
                <div className="badge badge-secondary badge-outline">
                  {userData.role}
                </div>
                <div className="badge badge-accent badge-outline">
                  {userData.email}{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="diff-item-2">
            <div className="bg-sky-500/30 grid place-content-center text-9xl font-black">
              <h2 className="title">
                WELCOME TO {userData?.name}&apos;S PROFILE!!!
              </h2>

              {/* photo */}
              <div className="flex justify-center items-center mt-8">
                <div className="avatar online">
                  <div className="w-40 rounded-full">
                    <img src={userData.photoURL} />
                  </div>
                </div>
              </div>

              {/* baddges */}

              <div className="flex flex-col justify-center items-center mt-5 gap-5">
                <div className="badge badge-secondary badge-outline">
                  {userData.role}
                </div>
                <div className="badge badge-accent badge-outline">
                  {userData.email}{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="diff-resizer"></div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
