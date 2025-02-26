import Image from "next/image";

export default function Membership() {
    return (
        <>
            {/* main */}
            <main className="flex flex-col justify-end">
                <h1 className="text-3xl font-semibold mx-4 text-white relative bottom-[25px]">
                    Membership Information
                </h1>
            </main>

            <p className="text-[#123800] mx-4 my-5"><span className="underline">Home</span> {">"} <span className="underline">Membership</span></p>
            <div className="max-w-[25rem] md:max-w-full m-auto md:mx-4 my-5 flex flex-col gap-2">
                <p className="text-lg md:flex-1 md:leading-none">
                    Est blanditiis totam id dolorum totam est neque adipisci est totam nihil et consequatur voluptatem ut necessitatibus voluptatum id assumenda iusto. Et velit esse vel perferendis recusandae quo architecto odit aut quos minima.
                </p>
                <p className="text-lg md:flex-1 md:leading-none">
                    Est blanditiis totam id dolorum totam est neque adipisci est totam nihil et consequatur voluptatem ut necessitatibus voluptatum id assumenda iusto. Et velit esse vel perferendis recusandae quo architecto odit aut quos minima.
                </p>
            </div>
            <div className="max-w-[25rem] md:max-w-full m-auto md:mx-4 my-5 flex flex-col gap-2">
                <h1 className="text-3xl text-[#123800] mb-5 md:flex-1">
                    Benefits
                </h1>
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                    <Image
                        className="rounded-3xl h-full w-full md:w-[20rem]"
                        src="/rect1.png"
                        alt="rect"
                        width={500}  // Set a width for the image
                        height={700} // Set a height for the image
                    />
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col gap-4">
                            <div className="w-full">
                                <div className="flex gap-6 items-center">
                                    <Image
                                        className="rounded-3xl h-[46px] w-[58px]"
                                        src="/leaf.svg"
                                        alt="rect"
                                        width={100}  // Set a width for the image
                                        height={100} // Set a height for the image
                                    />
                                    <h1 className="text-3xl text-[#123800]">Lorem Ipsum</h1>
                                </div>
                                <p className="text-lg md:leading-none">
                                    Est blanditiis totam id dolorum totam est neque adipisci est totam nihil et consequatur voluptatem ut necessitatibus voluptatum id assumenda iusto.
                                </p>
                            </div>
                            <div className="w-full">
                                <div className="flex gap-6 items-center">
                                    <Image
                                        className="rounded-3xl h-[46px] w-[58px]"
                                        src="/leaf.svg"
                                        alt="rect"
                                        width={100}  // Set a width for the image
                                        height={100} // Set a height for the image
                                    />
                                    <h1 className="text-3xl text-[#123800]">Lorem Ipsum</h1>
                                </div>
                                <p className="text-lg md:leading-none">
                                    Est blanditiis totam id dolorum totam est neque adipisci est totam nihil et consequatur voluptatem ut necessitatibus voluptatum id assumenda iusto.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="w-full">
                                <div className="flex gap-6 items-center">
                                    <Image
                                        className="rounded-3xl h-[46px] w-[58px]"
                                        src="/leaf.svg"
                                        alt="rect"
                                        width={100}  // Set a width for the image
                                        height={100} // Set a height for the image
                                    />
                                    <h1 className="text-3xl text-[#123800]">Lorem Ipsum</h1>
                                </div>
                                <p className="text-lg md:leading-none">
                                    Est blanditiis totam id dolorum totam est neque adipisci est totam nihil et consequatur voluptatem ut necessitatibus voluptatum id assumenda iusto.
                                </p>
                            </div>
                            <div className="w-full">
                                <div className="flex gap-6 items-center">
                                    <Image
                                        className="rounded-3xl h-[46px] w-[58px]"
                                        src="/leaf.svg"
                                        alt="rect"
                                        width={100}  // Set a width for the image
                                        height={100} // Set a height for the image
                                    />
                                    <h1 className="text-3xl text-[#123800]">Lorem Ipsum</h1>
                                </div>
                                <p className="text-lg md:leading-none">
                                    Est blanditiis totam id dolorum totam est neque adipisci est totam nihil et consequatur voluptatem ut necessitatibus voluptatum id assumenda iusto.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[25rem] md:max-w-full m-auto md:mx-4 my-5 mt-8 flex flex-col md:flex-row gap-2 md:p-[25px] md:gap-4">
                <h1 className="text-6xl md:my-auto text-[#123800] mb-5 md:flex-1">How to apply</h1>
                <div className="flex flex-col gap-4 md:flex-2">
                    <div className="flex border-[1px] rounded-md p-[18px] gap-4 border-[#D9D9D9]">
                        <Image
                            className="h-[160px] md:h-[160px]"
                            src="/pot1.png"
                            alt="rect"
                            width={160}  // Set a width for the image
                            height={160} // Set a height for the image
                        />
                        <div>
                            <h1>Step 1: Download application form</h1>
                            <p>Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.</p>
                            <button className="bg-[#123800] w-fit text-white px-4 py-2 rounded-xl mt-4">
                                Download
                            </button>
                        </div>
                    </div>
                    <div className="flex border-[1px] rounded-md p-[18px] gap-4 border-[#D9D9D9]">
                        <Image
                            className="h-[160px] md:h-[160px]"
                            src="/pot2.png"
                            alt="rect"
                            width={160}  // Set a width for the image
                            height={160} // Set a height for the image
                        />
                        <div>
                            <h1>Step 2: Pay membership fee</h1>
                            <p>Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.</p>
                            <button className="bg-[#123800] w-fit text-white px-4 py-2 rounded-xl mt-4">
                                Download
                            </button>
                        </div>
                    </div>
                    <div className="flex border-[1px] rounded-md p-[18px] gap-4 border-[#D9D9D9]">
                        <Image
                            className="h-[160px] md:h-[160px]"
                            src="/pot3.png"
                            alt="rect"
                            width={160}  // Set a width for the image
                            height={160} // Set a height for the image
                        />
                        <div>
                            <h1>Step 3: Wait for your login information</h1>
                            <p>Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.</p>
                            <button className="bg-[#123800] w-fit text-white px-4 py-2 rounded-xl mt-4">
                                Download
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
