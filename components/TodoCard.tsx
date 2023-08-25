"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
	DraggableProvidedDraggableProps,
	DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useBoardStore } from "../store/BoardStore";
import getUrl from "../lib/getUrl";

type Props = {
	todo: Todo;
	index: number;
	id: TypedColumn;
	innerRef: (element: HTMLElement | null) => void;
	draggableProps: DraggableProvidedDraggableProps;
	dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

const TodoCard = ({
	todo,
	index,
	id,
	innerRef,
	draggableProps,
	dragHandleProps,
}: Props) => {
	const deleteTask = useBoardStore((state) => state.deleteTask);
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	useEffect(() => {
		if (todo.image) {
			const fetchImage = async () => {
				const url = await getUrl(todo.image!);
				if (url) {
					setImageUrl(url.toString());
				}
			};

			fetchImage();
		}
	}, []);
	return (
		<div
			{...draggableProps}
			{...dragHandleProps}
			ref={innerRef}
			className="bg-white rounded-md space-y-2 drop-shadow-md"
		>
			<div className="flex justify-between items-center p-5">
				<p>{todo.title}</p>
				<button
					onClick={() => deleteTask(index, todo, id)}
					className="text-red-500 hover:text-red-600"
				>
					<XCircleIcon className="ml-5 h-8 w-8" />
				</button>
			</div>

			{/*add image here...*/}
			{imageUrl && (
				<div className="relative h-full w-full rounded-b-md">
					<Image
						src={imageUrl}
						alt="Task image"
						width={200}
						height={100}
						className="w-full object-contain rounded-b-md"
					/>
				</div>
			)}
		</div>
	);
};

export default TodoCard;
