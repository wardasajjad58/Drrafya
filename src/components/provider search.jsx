import React from "react";
import { Search, MapPin, Phone, Globe, Heart, ChevronDown } from "lucide-react";

const providers = [
  {
    id: 1,
    name: "Hope Pregnancy Clinic 1",
    address: "123 Healthcare Ave, Suite 100, Dallas, TX 75201",
    type: "Pregnancy Center",
  },
  {
    id: 2,
    name: "Hope Pregnancy Clinic 2",
    address: "123 Healthcare Ave, Suite 100, Dallas, TX 75201",
    type: "Pregnancy Center",
  },
  {
    id: 3,
    name: "Hope Pregnancy Clinic 3",
    address: "123 Healthcare Ave, Suite 100, Dallas, TX 75201",
    type: "Pregnancy Center",
  },
  {
    id: 4,
    name: "Hope Pregnancy Clinic 4",
    address: "123 Healthcare Ave, Suite 100, Dallas, TX 75201",
    type: "Pregnancy Center",
  },
];

function ProviderCard({ provider }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-wide text-pink-600 bg-pink-50 px-2 py-1 rounded-full">
          {provider.type}
        </span>
        <button className="text-gray-400 hover:text-pink-500">
          <Heart size={16} />
        </button>
      </div>

      <h3 className="text-sm font-bold text-gray-900 mb-2">{provider.name}</h3>

      <div className="flex items-start gap-2 text-xs text-gray-500 mb-4">
        <MapPin size={14} className="mt-0.5 text-yellow-500" />
        <p>{provider.address}</p>
      </div>

      <div className="flex items-center gap-4 text-xs font-medium text-gray-700">
        <button className="flex items-center gap-1 hover:text-pink-600">
          <Phone size={14} />
          Call
        </button>
        <button className="flex items-center gap-1 hover:text-pink-600">
          <Globe size={14} />
          Website
        </button>
      </div>
    </div>
  );
}

export default function ProviderSearchPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f8] text-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-pink-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Provider Search
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-pink-50 mb-8">
            Find a pregnancy center, adoption clinic, or maternity home near you.
            We’re here to help you every step of the way.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button className="bg-white text-pink-600 font-semibold text-sm px-6 py-3 rounded-full shadow hover:scale-105 transition">
              Find a Center
            </button>
            <button className="bg-yellow-400 text-gray-900 font-semibold text-sm px-6 py-3 rounded-full shadow hover:scale-105 transition">
              Free Live Chat
            </button>
          </div>
        </div>

        {/* bottom wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 140"
            className="w-full h-[90px]"
            preserveAspectRatio="none"
          >
            <path
              fill="#f7f7f8"
              d="M0,96L80,85.3C160,75,320,53,480,48C640,43,800,53,960,69.3C1120,85,1280,107,1360,117.3L1440,128L1440,160L1360,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z"
            />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 -mt-2 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Filters */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="bg-[#eef1f5] rounded-2xl p-5 shadow-sm">
              <h2 className="text-sm font-bold mb-5 flex items-center gap-2">
                <span className="text-pink-500">⌕</span>
                Search Filters
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-2">
                    Name of Facility
                  </label>
                  <div className="relative">
                    <Search
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Search by name..."
                      className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-2">
                    Facility Type
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 px-3 text-sm outline-none focus:ring-2 focus:ring-pink-400">
                      <option>All facilities</option>
                      <option>Pregnancy Center</option>
                      <option>Adoption Clinic</option>
                      <option>Maternity Home</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter ZIP code"
                    className="w-full rounded-lg border border-gray-200 bg-white py-2.5 px-3 text-sm outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm py-3 rounded-lg shadow">
                  Search Providers
                </button>

                <button className="w-full text-xs text-gray-400 hover:text-pink-600">
                  Clear all filters
                </button>
              </div>
            </div>
          </aside>

          {/* Map + Cards */}
          <div className="lg:col-span-8 xl:col-span-9">
            {/* Map */}
            <div className="bg-[#dfe5ec] rounded-2xl h-[320px] shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                <MapPin size={28} className="text-pink-500 mb-2" />
                <p className="text-sm">Interactive Map Loading...</p>
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center">
                    <MapPin size={14} className="text-pink-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">
                      Showing 24 locations
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Within 25 miles of your area
                    </p>
                  </div>
                </div>
                <button className="text-xs font-semibold text-pink-600 hover:underline">
                  View List
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              {providers.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}