import boxing from "../../../assets/boxing.jpg";

export function HomeContent() {
    return (
    <div className="relative min-h-screen">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${boxing})` }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENT */}
      <div className="relative flex items-center justify-center min-h-screen">

        <div className="text-center text-white max-w-xl px-6">

          <h1 className="text-7xl font-bold text-purple-700 mb-6">
            Boxing Club
          </h1>

          <p className="text-xl">
            All your boxing club memberships, trainings and users in one system
          </p>

        </div>

      </div>

    </div>
  );
}