import { Link } from "react-router-dom"; // Fixed import
import { PlusIcon } from "lucide-react";

const Navbar = () => {
    return (
        <header className="bg-base-300 border-b border-base-content/10">
            <div className="mx-auto max-w-6xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter drop-shadow-lg">
                            ThinkBoard
                        </h1>
                    </div>
                    <Link
                        to="/create"
                        className="btn btn-primary flex items-center gap-2 shadow-md hover:scale-105 transition-transform duration-200"
                    >
                        <PlusIcon className="size-5" />
                        <span>New Note</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;