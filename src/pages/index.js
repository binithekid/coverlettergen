import Navbar from "../../components/Navbar";
import Form from "../../components/Form";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div className='px-4 md:px-14 pt-6'>
      <Navbar />
      <main className='flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient'>
        <h1 className='mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-800 sm:text-7xl'>
          Generating your perfect cover letter using{" "}
          <span className='text-blue-400'>AI</span>
        </h1>
        <Form />
      </main>
      <Footer />
    </div>
  );
}
