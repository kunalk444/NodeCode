import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { apiCallFunction } from '../helpers/apiHelper';
import EditorBox from './InsideProblemComponents/EditorBox';
import DescriptionBox from './InsideProblemComponents/DescriptionBox';
import { useDispatch } from 'react-redux';
import { setProblemData } from './Slices/insideProblemSlice';
import Navbar from './Navbar';

function InsideProblem() {
    const [search, setSearch] = useSearchParams();
    const dispatch = useDispatch();
    const id = search.get("id");

    useEffect(() => {
        (async () => {
            const res = await apiCallFunction(`viewproblems/insideproblem/?id=${id}`, null, "GET");
            res && dispatch(setProblemData(res.data));
        })();
    }, []);

    return (
        <div className="h-[calc(100vh-56px)] flex flex-col">
            <Navbar />
            <div className="h-14 shrink-0 bg-white" />

            <div className="flex flex-1 gap-12 px-6 overflow-hidden">

                <div className="w-1/2 h-full border-r border-slate-200">
                    <DescriptionBox />
                </div>

                <div className="w-1/2 h-full">
                    <EditorBox />
                </div>

            </div>
        </div>
    );


}

export default InsideProblem
