import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './UploadFile.css'; // Import the CSS file
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExamTable from './ExamTable'; 
import RoomExam from './RoomExam'; 
import Navbar  from '../Navbar/Navbar';



function UploadFile(props) {
    const URL = "http://localhost:8080"
    console.log("REF::" + props.ref)
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [dataExamTable, setdataExamTable] = useState([]);
    const [roomExamData, setRoomExamData] = useState([]);
    const [selectedOption, setSelectedOption] = useState("examTable");


    async function GetDataFromApi() {
        try {
            const [res1 , res2] = await Promise.all([
                fetch(URL + "/select_data/examtable") ,
                fetch(URL + "/select_data/roomexam")
            ])
            const dataExam = await res1.json()
            const dataRoomExam = await res2.json()
            setRoomExamData(dataRoomExam === null ? [] : dataRoomExam)
            setdataExamTable(dataExam === null ? [] : dataExam);
            console.log(roomExamData)
        } catch (error) {
            console.log("Data APi is null")
        }
        
    }

    useEffect(() => {
        GetDataFromApi()
   
    }, [])


    function DeletePopUp() {
        Swal.fire({
            title: "คุณต้องการลบไฟล์ใช่ไหม",
            text: "ไฟล์ที่คุณนำเข้าก่อนหน้านี้จะหายไป",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then((res) => {
            if (res.isConfirmed) {
                handleDlete()
            }
        })
    }
    function UploadPopUp() {
        Swal.fire({
            title: 'Are you sure?',
            text: "คุณต้องการอัพโหลดไฟล์" + fileName,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then((res) => {
            if (res.isConfirmed) {
                handleUpload()
            }
        })
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: '.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        onDrop: (acceptedFiles, rejectedFiles) => {
            if (acceptedFiles && acceptedFiles.length > 0) {
                const selectedFile = acceptedFiles[0];
                const fileExtension = selectedFile.name.split('.').pop();
                if (fileExtension === 'xlsx') {
                    setFile(selectedFile);
                    setFileName(selectedFile.name);
                } else {
                    alert('Please select a valid .xlsx file');
                }
            }
            if (rejectedFiles && rejectedFiles.length > 0) {
                alert('Please select a valid .xlsx file');
            }
        }
    });

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('FileExcel', file);
            if (file) {
                const response = await axios.post(URL + '/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                GetDataFromApi()

                console.log("File uploaded successfully", response.data);
                console.log("File uploaded successfully", response.data.filename);
            } else {
                alert("File Invalid")
            }

        } catch (error) {
            console.error('Error uploading file: ', error);
            console.log(file)
        }
    };
    async function handleDlete() {
        try {
            const response = await axios.post(URL + '/DeleteTable', {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            GetDataFromApi()
            console.log("File Delete successfully", response.data);
        } catch (error) {
            console.log(error)
        }
    }

    function SelectTanble() {
        let content
        console.log(selectedOption)
        if (dataExamTable.length !== 0) {
            if (selectedOption === 'examTable') {
                content = <ExamTable data={dataExamTable} />;
            } else if (selectedOption ==="roomExam") {
                content = <RoomExam data={roomExamData} />;
            }
        } else {
            content = <h1 style={{
                textAlign: "center",
                color: "#666666"
            }}>ยังไม่มีข้อมูล</h1>
        }

        return content
    }
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
      };
    return (
        <div className='mainweb'>
           <div>
            <Navbar/> <br/><br/><br/>
            <h1>นำข้อมูลเข้าโดย CSV</h1>
           </div>
           
            
            <div className='card'>
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>
                        {dataExamTable.length === 0 || dataExamTable === null ? (
                            <>เลือกไฟล์ข้อมูล</>
                        ) : (
                            <>มีข้อมูลแล้ว</>
                        )}
                    </p>
                </div>
            </div>
            <button style={{ backgroundColor: "green" }} onClick={UploadPopUp} disabled={!file}>Upload File</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button style={{ backgroundColor: "red" }} onClick={DeletePopUp} >Delete File</button><br /><br />
            <select id="dropdown" value={selectedOption} onChange={handleChange} className="custom-select">
                <option value="examTable">Exam Table</option>
                <option value="roomExam">Room Exam</option>
            </select>
            <br/><br/>
            {SelectTanble()}


        </div>
    );

};

export default UploadFile;


