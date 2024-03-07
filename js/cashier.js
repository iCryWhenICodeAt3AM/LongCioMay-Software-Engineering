// Add event listener to the "Dashboard" item
document.querySelector('.dashboard').addEventListener('click', function() {
    // Show the content when the item is clicked
    document.querySelector('.orders').classList.add('d-none');
    document.querySelector('.orderlist-container').classList.add('d-none');
    document.querySelector('.dashboard-content').classList.remove('d-none');
    document.querySelector('.detailslist-container').classList.remove('d-none');

});
// Add event listener to the "Sales" item
document.querySelector('.sales').addEventListener('click', function() {
    // Show the content when the item is clicked
    document.querySelector('.orders').classList.add('d-none');
    document.querySelector('.orderlist-container').classList.add('d-none');
    document.querySelector('.dashboard-content').classList.add('d-none');
    document.querySelector('.detailslist-container').classList.add('d-none');

});
// Add event listener to the "Take Orders" item
document.querySelector('.take-orders').addEventListener('click', function() {
    // Show the content when the item is clicked
    document.querySelector('.orders').classList.remove('d-none');
    document.querySelector('.orderlist-container').classList.remove('d-none');
    document.querySelector('.dashboard-content').classList.add('d-none');
    document.querySelector('.detailslist-container').classList.add('d-none');
});

let documentId = "";
let total = 0;
function resetDetailsList(){
    document.querySelector(`.detailslist-container`).innerHTML = `
        <div class="details-list">
            <div class="row">
                <!-- Customer ID -->
                <div class="col-12">
                    <div class="customer-id m-2 pt-3 p-2">
                        <h6><b>Customer ID - 0000000013</b></h6>
                    </div>
                    <!-- List -->
                </div>
                <!-- Order Items -->
                <div class="details-items col-10 offset-1 p-3">
                    <!-- Headers -->
                    <div class="row mb-2">
                        <div class="col-2 list-item p-0"><b>Qty</b></div>
                        <div class="col-6 list-item p-0"><b>Item</b></div>
                        <div class="col-2 list-item p-0"><b>Total</b></div>
                        <div class="col-2 list-item p-0"><b>Act</b></div>
                    </div>
                    <!-- Contents -->
                    
                </div>
                <div class="col-12 pt-3">
                    <div class="row">
                        <div class="col-12">
                            <h6><b>Order Total</b></h6>
                        </div>
                        <div class="col-12">
                            <h6 id="order-total">0</h6>
                        </div>
                    </div>
                </div>
                <div class="buttons-list col-12 mt-1">
                    <div class="row">
                        <div class="col-6">
                            <button class="btn btn-c btn-outline-success verify">
                                <img src="images/check.svg" alt="Check" height="100%" width="100%">
                            </button>
                        </div>
                        <div class="col-6">
                            <button class="btn btn-c btn-outline-danger cancel">
                                X
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
function pendingButtonAdjust(){
    document.querySelector('.buttons-list').innerHTML = `
        <button class="btn btn-c btn-outline-danger cancel">
            X
        </button>
    `;
}
function completedButtonAdjust(){
    document.querySelector('.buttons-list').innerHTML = `
        <button class="btn btn-c btn-outline-success verify">
            <img src="images/check.svg" alt="Check" height="100%" width="100%">
        </button>
    `;
}
// 
// Verification Button
verification();
function verification(){
    documentId = "";
    resetDetailsList();
    // Show the content when the item is clicked
    document.querySelectorAll('.dashboard-button').forEach(button => {
        button.classList.add('btn-outline-dark');
        button.classList.remove('btn-success');
        button.classList.remove('disabled');
    });
    document.querySelector(".verification").classList.remove("btn-outline-dark");
    document.querySelector(".verification").classList.add("disabled");
    document.querySelector(".verification").classList.add("btn-success");
    document.getElementById('list').innerHTML = "";
    db.collection("orders").doc("BawoijACJlbVRi8sHQqI").collection("queue").get().then((itemSnapshot) => {
        itemSnapshot.forEach((itemDoc) => {
            const itemData = itemDoc.data();
            const tableid = itemData.tableid;
            const customerid = itemData.customerid;
            const status = itemData.status;
            const total = itemData.total;
            const date = itemData.date;
            
            // Construct HTML for each row
            document.getElementById('list').innerHTML += `
                <tr id="verification-list">
                    <td>${tableid}</td>
                    <td>${customerid}</td>
                    <td>${total}</td>
                    <td>${status}</td>
                    <td><button class="btn btn-sm btn-success ${itemDoc.id} list-button" onclick="getDetails('${itemDoc.id}')">Confirm</button></td>
                </tr>
            `;
        });
    });
}
// Pending Button
function pending(){
    documentId = "";
    resetDetailsList();
    pendingButtonAdjust();
    document.querySelectorAll('.dashboard-button').forEach(button => {
        button.classList.add('btn-outline-dark');
        button.classList.remove('btn-success');
        button.classList.remove('disabled');
    });
    document.querySelector(".pending").classList.remove("btn-outline-dark");
    document.querySelector(".pending").classList.add("disabled");
    document.querySelector(".pending").classList.add("btn-success");
    document.getElementById('list').innerHTML = "";
    db.collection("orders").doc("d716BHinTx1rHwR96KOV").collection("queue").get().then((itemSnapshot) => {
        itemSnapshot.forEach((itemDoc) => {
            const itemData = itemDoc.data();
            const tableid = itemData.tableid;
            const customerid = itemData.customerid;
            const status = itemData.status;
            const total = itemData.total;
            const date = itemData.date;
            
            // Construct HTML for each row
            document.getElementById('list').innerHTML += `
                <tr id="pending-list">
                    <td>${tableid}</td>
                    <td>${customerid}</td>
                    <td>${total}</td>
                    <td>${status}</td>
                    <td><button class="btn btn-sm btn-success ${itemDoc.id} list-button" onclick="getDetails('${itemDoc.id}')">Confirm</button></td>
                </tr>
            `;
        });
    });
}
// Completed Button
function completed(){
    documentId = "";
    resetDetailsList();
    completedButtonAdjust();
    document.querySelectorAll('.dashboard-button').forEach(button => {
        button.classList.add('btn-outline-dark');
        button.classList.remove('btn-success');
        button.classList.remove('disabled');
    });
    document.querySelector(".completed").classList.remove("btn-outline-dark");
    document.querySelector(".completed").classList.add("btn-success");
    document.querySelector(".completed").classList.add("disabled");
    document.getElementById('list').innerHTML = "";
}

function getDetails(docId){
    let labelId = "";
    const verifyButton = document.querySelector('.verify');
    const cancelButton = document.querySelector('.cancel');
    if(!verifyButton){
        if (cancelButton) {
            cancelButton.setAttribute('onclick', `cancel('${docId}', 'pending')`);
            labelId = "d716BHinTx1rHwR96KOV";
        }
    } else {
        if (!cancelButton) {
            verifyButton.setAttribute('onclick', `verify('${docId}', 'completed')`);
            labelId = "QiQgHzK5ejJONcqySnGg";
        }else{
            verifyButton.setAttribute('onclick', `verify('${docId}', 'verification')`);
            cancelButton.setAttribute('onclick', `cancel('${docId}', 'verification')`);
            labelId = "BawoijACJlbVRi8sHQqI";
        }
    }
    
    
    total = 0;
    // If the document was only clicked once
    if(documentId != docId){
        // Reset all list buttons
        document.querySelectorAll('.list-button').forEach(button => {
            button.classList.add('btn-success');
            button.classList.remove('btn-danger');
            button.innerHTML = "Confirm";

        });
        document.querySelector(`.${docId}`).classList.remove('btn-success');
        document.querySelector(`.${docId}`).classList.add('btn-danger');
        document.querySelector(`.${docId}`).innerHTML = "X";
        document.querySelector(".details-items").innerHTML = `
            <div class="row mb-2">
                <div class="col-2 list-item p-0"><b>Qty</b></div>
                <div class="col-6 list-item p-0"><b>Item</b></div>
                <div class="col-2 list-item p-0"><b>Total</b></div>
                <div class="col-2 list-item p-0"><b>Act</b></div>
            </div>
        `;

        // Get details from the same collection for the current itemDoc
        db.collection("orders").doc(labelId).collection("queue").doc(docId).collection("details").get().then((detailSnapshot) => {
            detailSnapshot.forEach((detailDoc) => {
                const detailData = detailDoc.data();
                console.log(detailData.dish);
                // Append details to the itemHTML
                const rowId = 'row_' + Math.random().toString(36).substr(2, 9);
                console.log(detailDoc.id);
                document.querySelector(".details-items").innerHTML += `
                    <div class="row mt-1 mb-1" id="${rowId}">
                        <div class="col-2 list-item p-0 mt-2"><b>${detailData.qty}</b></div>
                        <div class="col-6 list-item p-0 mt-2"><b>${detailData.dish}</b></div>
                        <div class="col-2 list-item p-0 mt-2"><b>${detailData.total}</b></div>
                        <div class="col-2 list-item p-0"><div class="col-2 list-item p-0"><button class="btn-x btn btn-sm btn-outline-danger" onclick="openConfirmationModal('${detailData.dish}', ${detailData.total}, ${detailData.qty}, '${rowId}')">X</button></div></div>
                    </div>
                `;
                total += parseFloat(detailData.total);
                console.log(total)
                document.getElementById("order-total").innerHTML = total.toFixed(0);
            });
        }).catch((error) => {
            console.log("Error getting details:", error);
        });
        documentId = docId;
    } else {
        // Reset all list buttons
        document.querySelectorAll('.list-button').forEach(button => {
            button.classList.add('btn-success');
            button.classList.remove('btn-danger');
            button.innerHTML = "Confirm";

        });
        documentId = "";
    }
}

function verify(docId) {
    verifytransferDocument(docId);
}

function verifytransferDocument(docId) {
    const sourceDocRef = db.collection('orders').doc('BawoijACJlbVRi8sHQqI').collection('queue').doc(docId);
    const destDocRef = db.collection('orders').doc('d716BHinTx1rHwR96KOV').collection('queue').doc(docId);

    // Get the source document and its subcollection
    sourceDocRef.get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                const data = docSnapshot.data();
                destDocRef.set(data)
                    .then(() => {
                        console.log('Document transferred successfully.');
                        verifytransferSubcollection(docId);
                    })
                    .catch((error) => {
                        console.error('Error transferring document:', error);
                    });
            } else {
                console.error('Document does not exist in source collection.');
            }
        })
        .catch((error) => {
            console.error('Error getting document:', error);
        });
}
function verifytransferSubcollection(docId) {
    const sourceSubcollectionRef = db.collection('orders').doc('BawoijACJlbVRi8sHQqI').collection('queue').doc(docId).collection('details');
    const destSubcollectionRef = db.collection('orders').doc('d716BHinTx1rHwR96KOV').collection('queue').doc(docId).collection('details');

    // Get all documents in the source subcollection
    sourceSubcollectionRef.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const subDocData = doc.data();
                destSubcollectionRef.doc(doc.id).set(subDocData)
                    .then(() => {
                        console.log('Subdocument transferred successfully.');
                        // Delete the source subcollection after all documents have been transferred
                        verifyremoveDocIdFromSource(docId);
                    })
                    .catch((error) => {
                        console.error('Error transferring subdocument:', error);
                    });
            });
        })
        .catch((error) => {
            console.error('Error getting subcollection documents:', error);
        });
}

function verifyremoveDocIdFromSource(docId) {
    const docRef = db.collection(`orders/BawoijACJlbVRi8sHQqI/queue`).doc(docId);

    // Delete the "details" collection
    docRef.collection('details').get().then(snapshot => {
        snapshot.forEach(doc => {
            doc.ref.delete();
        });
        console.log("Collection 'details' successfully deleted!");

        // Now delete the document itself
        docRef.delete().then(() => {
            alert("Document has been successfully verified.")
            location.reload();
            console.log("Document and its 'details' collection successfully deleted from the 'queue' subcollection!");
        }).catch(error => {
            console.error("Error removing document from the 'queue' subcollection: ", error);
        });
    }).catch(error => {
        console.error("Error deleting documents in 'details' collection: ", error);
    });
}

function cancel(docId, label) {
    let labelId = "";
    if (label == 'verification') {
        labelId = "BawoijACJlbVRi8sHQqI";
    } else if (label == 'pending') {
        labelId = "d716BHinTx1rHwR96KOV";
    } else {
        labelId = "QiQgHzK5ejJONcqySnGg";
    }

    const docRef = db.collection(`orders/${labelId}/queue`).doc(docId);

    // Delete the "details" collection
    docRef.collection('details').get().then(snapshot => {
        snapshot.forEach(doc => {
            doc.ref.delete();
        });
        console.log("Collection 'details' successfully deleted!");

        // Now delete the document itself
        docRef.delete().then(() => {
            alert("Document has been successfully removed!")
            location.reload();
            console.log("Document and its 'details' collection successfully deleted from the 'queue' subcollection!");
        }).catch(error => {
            console.error("Error removing document from the 'queue' subcollection: ", error);
        });
    }).catch(error => {
        console.error("Error deleting documents in 'details' collection: ", error);
    });
}