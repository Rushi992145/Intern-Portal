import { Link } from 'react-router-dom';
import heroImage from '../assets/hero_img.png';  

const LandingContent = () => {
    return (
        <div className="px-4">
            <div className="flex flex-col md:flex-row m-4 md:m-16">
                <div className="Moto w-full md:w-1/2">
                    <div className="pt-8 md:pt-16 pl-4 md:pl-16 text-2xl md:text-4xl">
                        <div className="font-bold">Get and Share </div>
                        <div className="text-blue-500 font-bold">quality Internships & Jobs</div>
                    </div>
                    <div className="pt-4 md:pt-5 pl-4 md:pl-16">
                        The #1 way college students & early graduates get Internships, Jobs
                    </div>
                    <div className="getstarted pt-6 md:pt-12 pl-4 md:pl-16">
                        <Link to="/home"> 
                            <button className="bg-blue-500 text-white p-3 border-none rounded-3xl flex justify-center items-center">
                                Get Started
                                <span className="material-symbols-outlined">
                                    chevron_right
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center items-center">
                    <div className="flex justify-center items-center h-full">
                        <img 
                            src={heroImage} 
                            alt="Landscape" 
                            className="w-full h-full object-cover rounded-lg shadow-dark-blue "
                        />
                    </div>
                </div>
            </div>

            <div className="info flex items-center flex-col md:flex-row justify-between px-4 md:px-16 m-4 md:m-16">
                {[
                    { count: '30000+', label: 'Student Users' },
                    { count: '20000+', label: 'Got Opportunities' },
                    { count: '15000+', label: 'Jobs Shared' }
                ].map((item, index) => (
                    <div key={index} className="text-center p-4">
                        <div className='text-5xl font-bold'>
                            {item.count}
                        </div>
                        <div className='text-xl mt-1'>
                            {item.label}
                        </div>
                        <div className="line bg-blue-500 w-full h-3 rounded-3xl mt-3"></div>
                    </div>
                ))}
            </div>

            <div className='text-2xl flex justify-center my-4'>How InternNet helps you?</div>
            <div className="info flex flex-wrap justify-center items-center gap-5 px-4 md:px-16 m-4 md:m-16">
                {[
                    {
                        imgSrc: "./src/assets/cool.png",
                        title: "Get Upskilled",
                        description: "The #1 way college students & early graduates get Internships, Jobs"
                    },
                    {
                        imgSrc: "./src/assets/profilelogo.png",
                        title: "Create Profile",
                        description: "Create your profile with an easy-to-fill form and get recommended with relevant internships/jobs."
                    },
                    {
                        imgSrc: "./src/assets/hassalfrree.png",
                        title: "Hassle Free",
                        description: "An effortless way to get internships/jobs Opportunity."
                    },
                    {
                        imgSrc: "./src/assets/collab.png",
                        title: "Collaborate & Share",
                        description: "We encourage a community that shares and grows together."
                    }
                ].map((card, index) => (
                    <div key={index} className='h-[290px] w-full max-w-[250px] flex flex-col gap-6 justify-center items-center border border-gray-400 rounded-xl p-2'>
                        <img className='w-20 h-20' src={card.imgSrc} alt={card.title} />
                        <div className='font-bold text-xl'>{card.title}</div>
                        <div className='text-center'>{card.description}</div>
                    </div>
                ))}
            </div>

            <div className="getstarted flex justify-center items-center pt-6 md:pt-12">
                <Link to="/home">
                    <button className="bg-blue-500 w-48 text-white p-3 border-none rounded-3xl flex justify-center items-center">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default LandingContent;
