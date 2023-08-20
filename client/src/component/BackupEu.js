const renderAddressField = () => {
    return (
      <div>
        {editingField === "address" ? (
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <input
                type="text"
                name="address.streetName"
                className="form-control"
                value={profileData.address.streetName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="address.cityName"
                className="form-control"
                value={profileData.address.cityName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="number"
                name="address.houseNumber"
                className="form-control"
                value={profileData.address.houseNumber}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="number"
                name="address.postalCode"
                className="form-control"
                value={profileData.address.postalCode}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Address
            </button>
            <button
              className="btn btn-link"
              onClick={() => setEditingField(null)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <div>
              <strong>
                {`${profileData.address.houseNumber} ${profileData.address.streetName}, ${profileData.address.cityName}, ${profileData.address.postalCode}`}
              </strong>
            </div>
            <button
              className="btn btn-link"
              onClick={() => setEditingField("address")}
            >
              <FontAwesomeIcon icon={faHome} className="icon-edit" />
            </button>
          </div>
        )}
      </div>
    );
  };