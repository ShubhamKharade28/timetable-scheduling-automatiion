
const TextInput = ({value, setValue, label,placeholder="",type="text"}) => {
	return (
		<span className="flex gap-3 w-full items-center text-lg">
			<label className="w-40">{label}</label>
			<input 
				className="flex py-2 px-4 outline-none border-2 w-full rounded-lg"
				value={value}
				placeholder={placeholder}
				onChange={(e) => setValue(e.target.value)}
				type={type}
			/>
		</span>
	)
}

export default TextInput;