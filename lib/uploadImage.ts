import { ID, storage } from "../appwrite.ts"

const uploadImage = async (file: File) => {
	if(!file) return;

	const fileUploaded = await storage.createFile(
		"64db602f5f2dca06ac27",
		ID.unique(),
		file
	)

	return fileUploaded;
}

export default uploadImage;