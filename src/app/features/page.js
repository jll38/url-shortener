import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { Footer } from "@/components/footer";
export default function Features() {
  return (
    <>
      <Navbar />
      <main className="h-[100vh] flex justify-center items-center">
        <div className="flex flex-col md:flex-row md:justify-around">
          <section
            name="cta-features"
            className=" w-full sm:w-[575px] h-[300px] sm:h-[600px] "
          >
            <div className="w-full h-full flex flex-col items-center justify-center uppercase font-bold text-[2.8em] text-center ">
              <div className="text-delft-blue">The Tools You Need</div>
              <div className="text-payne-gray">All in One Place.</div>
              <div className="text-[.325em] normal-case font-normal ">
                Interested in our Latest Features?{" "}
                <Link href="/subscribe" className="hover:underline">
                  Try Premium Today (Coming Soon)
                </Link>
              </div>
            </div>
          </section>
          <section
            name="features"
            className="w-full sm:w-[600px] h-[566px] flex rounded-lg justify-center items-center px-4"
          >
            <table className="w-full">
              <thead>
                <tr>
                  <th className="font-semibold text-xl text-delft-blue p-2 border-solid border-r-4 border-b-2 border-delft-blue">
                    Features
                  </th>
                  <th className="font-semibold text-xl text-delft-blue text-center p-2 border-b-2 border-delft-blue">
                    Lite
                  </th>
                  <th className="font-semibold text-xl text-delft-blue text-center p-2 border-b-2 border-delft-blue">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 text-payne-gray border-solid border-r-4 border-delft-blue">
                    Basic URL Shortening
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-check"></i>
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-check"></i>
                  </td>
                </tr>
                <tr className="bg-payne-gray/25">
                  <td className="p-2 text-payne-gray border-solid border-r-4 border-delft-blue">
                    Basic Analytics
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-check"></i>
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-check"></i>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-payne-gray border-solid border-r-4 border-delft-blue">
                    Basic Redirects
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-check"></i>
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-check"></i>
                  </td>
                </tr>
                <tr className="bg-payne-gray/25">
                  <td className="p-2 text-payne-gray border-solid border-r-4 border-delft-blue">
                    Advanced Analytics
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-x"></i>
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-check"></i>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-payne-gray border-solid border-r-4 border-delft-blue">
                    Traffic Source Insights
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-x"></i>
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-check"></i>
                  </td>
                </tr>
                <tr className="bg-payne-gray/25">
                  <td className="p-2 text-payne-gray border-solid border-r-4 border-delft-blue">
                    Ads Display
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-check"></i>
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-x"></i>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-payne-gray border-solid border-r-4 border-delft-blue">
                    Custom Link Aliases
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-x"></i>
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-check"></i>
                  </td>
                </tr>
                <tr className="bg-payne-gray/25">
                  <td className="p-2 text-payne-gray border-solid border-r-4 border-delft-blue">
                    Password Protection
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-x"></i>
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-check"></i>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-payne-gray border-solid border-r-4 border-delft-blue">
                    QR Code Generation
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-x"></i>
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-check"></i>
                  </td>
                </tr>
                <tr className="bg-payne-gray/25">
                  <td className="p-2 text-payne-gray border-solid border-r-4 border-delft-blue">
                    Bulk Shortening
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-x"></i>
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-check"></i>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-payne-gray border-solid border-r-4 border-delft-blue">
                    Geo-tagging & Click Heatmap
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-x"></i>
                  </td>
                  <td className="text-center text-payne-gray p-2">
                    <i className="fa-solid fa-check"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </main>
      <Footer/>
    </>
  );
}
