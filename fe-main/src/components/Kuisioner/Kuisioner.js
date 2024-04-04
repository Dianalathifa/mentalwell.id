import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../layouts/AdminLayout";

const KuisionerList = () => {
  const [kuisionerList, setKuisionerList] = useState([]);

  useEffect(() => {
    getKuisionerList();
  }, []);

  const getKuisionerList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/kuisioner");
      setKuisionerList(response.data);
    } catch (error) {
      console.error("Error fetching kuisioner list:", error);
    }
  };

  const deleteKuisioner = async (id) => {
    try {
      const confirmed = window.confirm("Apakah Anda yakin ingin menghapus kuisioner ini?");
  
      if (confirmed) {
        await axios.get(`http://localhost:8080/api/kuisioner/${id}`);
        getKuisionerList(); // Panggil kembali data setelah penghapusan berhasil
      }
    } catch (error) {
      console.error("Error deleting kuisioner:", error);
    }
  };
  

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Kuisioner</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Daftar Kuisioner
              </h5>
              <Link to="/kuisioner/add">
                <Button variant="success">Tambah Kuisioner</Button>
              </Link>
            </div>
            <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>ID Kuisioner</th>
                <th>ID Kategori Test</th>
                <th>Pertanyaan</th>
                <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {kuisionerList.map((kuisioner, index) => (
                <tr key={kuisioner.id_kuisioner}>
                    <td>{index + 1}</td>
                    <td>{kuisioner.id_kuisioner}</td>
                    <td>{kuisioner.id_kategori}</td>
                    <td>{kuisioner.pertanyaan}</td>
                    <td>
                    <Link to={`/kuisioner/edit/${kuisioner.id_kuisioner}`} className="btn btn-primary btn-sm mr-2">
                        <FontAwesomeIcon icon={faEdit} /> Edit
                    </Link>
                    <Button variant="danger" size="sm" onClick={() => deleteKuisioner(kuisioner.id_kuisioner)}>
                        <FontAwesomeIcon icon={faTrash} /> Hapus
                    </Button>
                    </td>
                </tr>
                ))}
            </tbody>
            </Table>

            </div>
          </Card.Body>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default KuisionerList;
