export async function createPost(postText: string, postImage: FileList, userId: number) {
	try {
		const imageUrl = await getImageUrl(postImage);
		await fetch(process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL + "/api/v1/post", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				content: postText,
				image: imageUrl,
				user: {
					id: userId,
				},
				commments: [],
				usersWhoFollows: [],
				userWhoLikes: [],
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

export async function updatePost(postId: number, postText: string, postImageUrl: string) {
	try {
		await fetch(process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL + "/api/v1/post/" + postId, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				content: postText,
				image: postImageUrl,
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

export async function getImageUrl(imageFileList: FileList) {
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

export async function getFollowedPosts(userId: number) {
	try {
		const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL + "/api/v1/post/followed/" + userId, {
			headers: { "Content-Type": "application/json" },
		});
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

export async function getPostById(postId: string, userId: number) {
	try {
		const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL + "/api/v1/post/" + postId, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: userId,
			}),
		});
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

export async function getUserPosts(userId: number) {
	try {
		const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL + "/api/v1/post/user/" + userId, {
			headers: { "Content-Type": "application/json" },
		});
		const data = await response.json();
		if (!response.ok) {
			alert("Error getting user's post");
			return;
		}
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function addCommentToPost(postId: number, userId: number, commentToAdd: string) {
	try {
		await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/v1/post/${postId}/comment`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				content: commentToAdd,
				createdAt: new Date(),
				user: {
					id: userId,
				},
				post: null,
			}),
		}).catch((error) => {
			console.error(error);
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function getPostComments(postId: number) {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/v1/post/${postId}/comments`, {
			headers: { "Content-Type": "application/json" },
		});
		const data = await response.json();
		if (!response.ok) {
			alert("Error getting post comments");
			return;
		}
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function toggleLike(postId: number, userId: number) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/v1/post/${postId}/toggle-like`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: userId,
				}),
			}
		);
		if (!response.ok) {
			alert("Error when user toggle like in post");
		}
	} catch (error) {
		console.error(error);
	}
}

export async function toggleFollow(postId: number, userId: number) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/v1/post/${postId}/toggle-follow`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: userId,
				}),
			}
		);
		if (!response.ok) {
			alert("Error when user toggle like in post");
		}
	} catch (error) {
		console.error(error);
	}
}

export async function removePost(postId: number) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/v1/post/${postId}`,
			{
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			}
		);
		if (!response.ok) {
			alert("Error when user toggle like in post");
		}
	} catch (error) {
		console.error(error);
	}
}


