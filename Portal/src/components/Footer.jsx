
const Footer = () => {
  return (
    <div className="flex flex-col h-20 mt-16"> 
      <div className="flex-1 bg-blue-500">
       
        <div className="p-4 text-white text-center">
          <h4 className="text-lg font-bold">Start applying for companies NOW</h4>
          <p>Sign up for a free account</p>
        </div>
      </div>
      <div className="flex-none bg-black">
       
        <div className="p-4 text-white text-center">
          <p>&copy; {new Date().getFullYear()} InternNet. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
