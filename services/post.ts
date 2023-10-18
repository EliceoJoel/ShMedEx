export async function createPost(postText: string, postImage: FileList, userId: number) {
	try {
		const imageUrl = await getImageUrl(postImage);
		await fetch(process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL + "/api/v1/post", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				content: postText,
				image: imageUrl,
				likes: 0,
				user: {
					id: userId,
				},
				commments: [],
				usersWhoFollows: [],
				createdAt: new Date(),
				updatedAt: new Date(),
			}),
		}).catch((error) => {
			console.error(error);
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function getImageUrl(imageFileList: FileList) {
	try {
		if (imageFileList.length > 0) {
			const formData = new FormData();
			formData.append("file", imageFileList[0]);
			formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME as string);

			const response = await fetch(
				`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/`,
				{
					method: "POST",
					body: formData,
				}
			);

			if (response.ok) {
				const data = await response.json();
				return data.secure_url;
			} else {
				console.error("Error al cargar la imagen:", response.statusText);
				return null;
			}
		} else {
			return null;
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function getNotFollowedPosts(userId: number) {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL + "/api/v1/post/not-followed/" + userId,
			{
				headers: { "Content-Type": "application/json" },
			}
		);
		const data = await response.json();
		if (!response.ok) {
			alert("Error getting not followed posts");
			return;
		}
		return data;
	} catch (error) {
		console.error(error);
	}
}
