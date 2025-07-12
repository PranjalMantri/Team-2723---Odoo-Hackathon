import React from 'react';

const AdminDashboard = () => {
  // Table data array
  const listings = [
    {
      id: 1,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-pknet57Wi7-LjVDWUm1ldxqbUiB6DmWOtcE-uhW3lXNqubTelCLN58bee4ibSpdqdyAI_t3PFB25l2BeFfJmvhpgsJKwYqDc3uGjakqQTcgf8m6XwtatoUgbMd7wwuqdYK3PzIhPpmaZTULyh9SiX1GFru18o-kSVQEqy3EtN5LKKfbuFL8wRiYNz9QprNecN0SRbZiUwDNGgCp4xpDdfMNxbA1XVqhSqfcuk9AWHTsGDPJh4-F6joZ-YtHGw07iqpIQzFcYyIg",
      description: "Elegant evening gown, size M",
      user: "Sophia Clark",
      date: "2024-07-26"
    },
    {
      id: 2,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuComJVm0PI3mrDtT9flDsd9Ac9HEvxCoUk5KgjcZqfiyeYdV7Ctf_6dHSJq3Yqvw6Dr5ijgOSL1IJ1Sj5OyDT56qEnYW8HlVQT9B4AP5U__xT01nnzYgCVxG5hIz4cBaUp5BjTx1igAfNetdPKOeIsixjWGLxm07P011wUxaT6JbTdNb7r-7WXuxXTrF0OgzBFtmG0tRJfm6C2GdyAL8pj1gs5pJeHEynvPxEU3lbUuZmc_pjhoUx5Mz0USEi9SvZmMHyw_1qv6k_s",
      description: "Stylish leather jacket, size L",
      user: "Ethan Bennett",
      date: "2024-07-25"
    },
    {
      id: 3,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrimKVtmkoSiCXpaUIxISfJQWIrns4cy2nbtOxHhOMKGFmfk4ZoYhJZRu2BXX1FrwdVWwrr0de6-IZF9noobA9BwNZW1AdXcwAzDAv4G582J0VjIZX0Gc3-0ODy1XiZ4ireWmqY4xoWHS08SU_Znup4WNSK82-VlpOarxF2yYPF7DNNQOHSLS2JQMz53FiwF20zgF8q_wVzJWU5nDKsoW_16ykYipgDMujd4Jsfwl0DDg-C5Pp9S7k_8I44g7G6Juc4FWRTUY0z5E",
      description: "Fun graphic tee, size 8",
      user: "Olivia Carter",
      date: "2024-07-24"
    },
    {
      id: 4,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpEL7UEGSFKC9oFcTphR7ssL1tvMNNWXa4gT86QR3lTHpVLrxtB3TdKcGggc87OzN76OgblfaMYYkt0RCz6f9GX1y6BLk65M-eW6FdJwJY5eui49AcU9QzydGBckYIYzxandI_YaVcyth3730tP7V7fuzR0Q2H93Wzv4WLwHF22qwdmvBEir-gEDNzQqra0NdOsX2h4ouptO9xXo_IZ7ToL8Bj84muSnM2ESD1FNSS0i_P1QdUZgbpsYZCCYoiST1Pf0oCC7eCUqQ",
      description: "Classic blue jeans, size 28",
      user: "Ava Harper",
      date: "2024-07-23"
    },
    {
      id: 5,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAI3xLkHlFugIHZBKIRXjJudkhar-5Ut3GJR2FXA57ljAQekKhm-bIxvQJQ1ku7vMKhix0_KdeQiHaGckbqFeE2w8ajRJg98sP8mwVERuwmhs54iHHkdnr-nZ5jAvCfB07ujwt_WMnAZCBF9GJx2gEBIqQErGRFVXvEEJcQMFBvmIv9qLtvwUGsFh35Ar576qIHvwsRKW9B3GCJfLQyGf3QI9Zrxk3CpfB6eeljNS6N_wd3enZCF-uraabF_OEL5190rtC6y7C7kSk",
      description: "Comfortable running shoes, size 10",
      user: "Liam Foster",
      date: "2024-07-22"
    }
  ];

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#f8fbfa] overflow-x-hidden" 
         style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e8f2ec] px-10 py-3">
          <div className="flex items-center gap-4 text-[#0e1a13]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-[#0e1a13] text-lg font-bold leading-tight tracking-[-0.015em]">ReWear</h2>
          </div>
          
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-[#0e1a13] text-sm font-medium leading-normal hover:underline" href="#">Dashboard</a>
              <a className="text-[#0e1a13] text-sm font-medium leading-normal hover:underline" href="#">Listings</a>
              <a className="text-[#0e1a13] text-sm font-medium leading-normal hover:underline" href="#">Users</a>
              <a className="text-[#0e1a13] text-sm font-medium leading-normal hover:underline" href="#">Reports</a>
            </div>
            
            <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#e8f2ec] text-[#0e1a13] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#d1e6d9] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
              </svg>
            </button>
            
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzmX2341l2y2QKCeZN1GHcs4ZLG6_UPtZ67BdTrweaO-kuEGk9dM2yoSqJPwrdi5yMEOPLndPbMDJKGvNGwWTUEaeWVUgOSl8JjyGwNq2CszW0iG30oZZkXB6U0gNhj71iCsF5KKAxQN1LxkoRWHe6S6WKtvBtfv1yRIDi1S0VOJ2NPdloX4sfTqWY9fTwOU-pMND1paOvK-ThSVfewEl68crcQAazOX_gfYFksH8xgsQhOMJhyYUxJGCYsY89qJeE-UtCvmoEfqw")' }}
            ></div>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 w-full">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <h1 className="text-[#51946b] tracking-light text-2xl md:text-[32px] font-bold leading-tight">
                  Pending Listings
                </h1>
                <p className="text-[#0e1a13] text-sm font-normal leading-normal">
                  Review and manage new clothing listings before they go live.
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="px-4 py-3 w-full overflow-x-auto">
              <div className="flex overflow-hidden rounded-lg border border-[#d1e6d9] bg-[#f8fbfa]">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="bg-[#f8fbfa]">
                      <th className="px-4 py-3 text-left text-[#0e1a13] text-sm font-medium leading-normal w-14">Item</th>
                      <th className="px-4 py-3 text-left text-[#0e1a13] text-sm font-medium leading-normal">Description</th>
                      <th className="px-4 py-3 text-left text-[#0e1a13] text-sm font-medium leading-normal">User</th>
                      <th className="px-4 py-3 text-left text-[#0e1a13] text-sm font-medium leading-normal">Date</th>
                      <th className="px-4 py-3 text-left text-[#51946b] text-sm font-medium leading-normal w-60">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.map((listing) => (
                      <tr key={listing.id} className="border-t border-t-[#d1e6d9]">
                        <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                          <div 
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-20"
                            style={{ backgroundImage: `url('${listing.image}')` }}
                          ></div>
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#0e1a13] text-sm font-normal leading-normal">
                          {listing.description}
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#0e1a13] text-sm font-normal leading-normal">
                          {listing.user}
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#0e1a13] text-sm font-normal leading-normal">
                          {listing.date}
                        </td>
                        <td className="h-[72px] px-4 py-2 text-[#0e1a13] text-sm font-bold leading-normal tracking-[0.015em]">
                          <button className="mr-3 text-[#2e7d59] hover:text-[#1a5338] hover:underline">
                            Approve
                          </button>
                          <button className="text-[#c44545] hover:text-[#a33131] hover:underline">
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;