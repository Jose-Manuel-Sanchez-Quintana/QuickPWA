import { FaHome, FaPaperPlane, FaPortrait } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const Bottom_NavBar = () => {

	const navigate = useNavigate()

	return (
		<>
			<div className="sticky md:hidden bottom-0 left-0 z-10 w-full h-navbar-height shrink-0 bg-slate-300 border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
				<div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
					<button onClick={() => { navigate('/') }} type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
						<FaHome className="text-gray-700 dark:text-white" />
						<span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"></span>
					</button>
					<button onClick={() => { navigate('/dms') }} type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
						<FaPaperPlane className="text-gray-700 dark:text-white" />
						<span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"></span>
					</button>
					<button onClick={() => { navigate('profile?user=MGEmILpngZOuVA2Kg5xiOa1qHEM2') }} type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
						<FaPortrait className="text-gray-70 dark:text-white" />
					</button>
				</div>
			</div>
		</>
	)
}

export default Bottom_NavBar