import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../AuthContext';

import {

  FiMapPin,

  FiImage,

  FiType,

  FiFileText,

  FiWifi,

  FiTag,

  FiSave,

  FiX,

  FiPlus,

  FiTrash2,

  FiUpload

} from 'react-icons/fi';

import api from '../api';

import './AddCampsitePage.css';



const AddCampsitePage = () => {

  const navigate = useNavigate();

  const { user } = useAuth();

 

  const [formData, setFormData] = useState({

    name: '',

    location: '',

    lat: '',

    lon: '',

    description: '',

    images: [''],

    facilities: [''],

    tags: ['']

  });

 

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [message, setMessage] = useState({ type: '', text: '' });



  // Redirect if not logged in

  React.useEffect(() => {

    if (!user) {

      navigate('/login');

    }

  }, [user, navigate]);



  // Handle input changes

  const handleInputChange = (field, value) => {

    setFormData(prev => ({ ...prev, [field]: value }));

   

    // Clear errors for this field

    if (errors[field]) {

      setErrors(prev => ({ ...prev, [field]: '' }));

    }

   

    // Clear message

    if (message.text) {

      setMessage({ type: '', text: '' });

    }

  };



  // Handle array field changes (images, facilities, tags)

  const handleArrayChange = (field, index, value) => {

    const newArray = [...formData[field]];

    newArray[index] = value;

    setFormData(prev => ({ ...prev, [field]: newArray }));

  };



  // Add new array item

  const addArrayItem = (field) => {

    setFormData(prev => ({

      ...prev,

      [field]: [...prev[field], '']

    }));

  };



  // Remove array item

  const removeArrayItem = (field, index) => {

    if (formData[field].length > 1) {

      const newArray = formData[field].filter((_, i) => i !== index);

      setFormData(prev => ({ ...prev, [field]: newArray }));

    }

  };



  // Validate form

  const validateForm = () => {

    const newErrors = {};



    // Required fields

    if (!formData.name.trim()) {

      newErrors.name = 'Campsite name is required';

    }



    if (!formData.location.trim()) {

      newErrors.location = 'Location is required';

    }



    if (!formData.description.trim()) {

      newErrors.description = 'Description is required';

    } else if (formData.description.length < 50) {

      newErrors.description = 'Description must be at least 50 characters';

    }



    // Coordinates validation

    if (formData.lat && (isNaN(formData.lat) || formData.lat < -90 || formData.lat > 90)) {

      newErrors.lat = 'Latitude must be between -90 and 90';

    }



    if (formData.lon && (isNaN(formData.lon) || formData.lon < -180 || formData.lon > 180)) {

      newErrors.lon = 'Longitude must be between -180 and 180';

    }



    // Images validation

    const validImages = formData.images.filter(img => img.trim());

    if (validImages.length === 0) {

      newErrors.images = 'At least one image URL is required';

    } else {

      // Validate image URLs

      const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i;

      const invalidImages = validImages.filter(img => !urlPattern.test(img));

      if (invalidImages.length > 0) {

        newErrors.images = 'Please provide valid image URLs (jpg, jpeg, png, gif, webp)';

      }

    }



    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };



  // Handle form submission

  const handleSubmit = async (e) => {

    e.preventDefault();

   

    if (!validateForm()) {

      return;

    }



    setIsSubmitting(true);

    setMessage({ type: '', text: '' });



    try {

      // Prepare data for submission

      const submitData = {

        name: formData.name.trim(),

        location: formData.location.trim(),

        description: formData.description.trim(),

        images: formData.images.filter(img => img.trim()),

        facilities: formData.facilities.filter(facility => facility.trim()),

        tags: formData.tags.filter(tag => tag.trim())

      };



      // Add coordinates if provided

      if (formData.lat && formData.lon) {

        submitData.lat = parseFloat(formData.lat);

        submitData.lon = parseFloat(formData.lon);

      }



      const response = await api.post('/campsites', submitData);

     

      setMessage({ type: 'success', text: 'Campsite created successfully!' });

     

      // Redirect to campsite detail page after 2 seconds

      setTimeout(() => {

        navigate(`/campsite/${response.data._id}`);

      }, 2000);

     

    } catch (error) {

      console.error('Error creating campsite:', error);

      setMessage({

        type: 'error',

        text: error.response?.data?.error || 'Failed to create campsite. Please try again.'

      });

    } finally {

      setIsSubmitting(false);

    }

  };



  // Predefined facility options

  const facilityOptions = [

    'Restrooms', 'Showers', 'WiFi', 'Parking', 'Fire Pit', 'Picnic Tables',

    'Drinking Water', 'Electrical Hookups', 'Pet Friendly', 'Swimming',

    'Hiking Trails', 'Fishing', 'Playground', 'Store/Shop', 'Laundry'

  ];



  // Predefined tag options

  const tagOptions = [

    'Family Friendly', 'Pet Friendly', 'Scenic Views', 'Lakefront', 'Mountain',

    'Forest', 'Desert', 'Beach', 'Quiet', 'Adventure', 'Romantic', 'Budget Friendly'

  ];



  if (!user) {

    return null; // Will redirect to login

            }



            return (

            <div className="add-campsite-page navbar-offset">

            <div className="add-campsite-container">

            <div className="form-header">

            <h1>Add New Campsite</h1>
          <h1>Add New Campsite</h1>

          <p>Share your favorite camping spot with the community</p>

        </div>



        {message.text && (

          <div className={`alert alert-${message.type}`}>

            {message.text}

          </div>

        )}



        <form onSubmit={handleSubmit} className="campsite-form">

          {/* Basic Information */}

          <div className="form-section">

            <h3>Basic Information</h3>

           

            <div className="form-group">

              <label htmlFor="name">

                <FiType /> Campsite Name *

              </label>

              <input

                type="text"

                id="name"

                value={formData.name}

                onChange={(e) => handleInputChange('name', e.target.value)}

                placeholder="Enter campsite name"

                className={errors.name ? 'error' : ''}

                required

              />

              {errors.name && <span className="error-text">{errors.name}</span>}

            </div>



            <div className="form-group">

              <label htmlFor="location">

                <FiMapPin /> Location *

              </label>

              <input

                type="text"

                id="location"

                value={formData.location}

                onChange={(e) => handleInputChange('location', e.target.value)}

                placeholder="City, State, Country"

                className={errors.location ? 'error' : ''}

                required

              />

              {errors.location && <span className="error-text">{errors.location}</span>}

            </div>



            <div className="form-row">

              <div className="form-group">

                <label htmlFor="lat">Latitude</label>

                <input

                  type="number"

                  id="lat"

                  step="any"

                  value={formData.lat}

                  onChange={(e) => handleInputChange('lat', e.target.value)}

                  placeholder="e.g., 40.7128"

                  className={errors.lat ? 'error' : ''}

                />

                {errors.lat && <span className="error-text">{errors.lat}</span>}

              </div>

             

              <div className="form-group">

                <label htmlFor="lon">Longitude</label>

                <input

                  type="number"

                  id="lon"

                  step="any"

                  value={formData.lon}

                  onChange={(e) => handleInputChange('lon', e.target.value)}

                  placeholder="e.g., -74.0060"

                  className={errors.lon ? 'error' : ''}

                />

                {errors.lon && <span className="error-text">{errors.lon}</span>}

              </div>

            </div>



            <div className="form-group">

              <label htmlFor="description">

                <FiFileText /> Description *

              </label>

              <textarea

                id="description"

                value={formData.description}

                onChange={(e) => handleInputChange('description', e.target.value)}

                placeholder="Describe the campsite, its features, and what makes it special (minimum 50 characters)"

                rows="4"

                className={errors.description ? 'error' : ''}

                required

              />

              <small>{formData.description.length}/50 minimum characters</small>

              {errors.description && <span className="error-text">{errors.description}</span>}

            </div>

          </div>



          {/* Images */}

          <div className="form-section">

            <h3><FiImage /> Images *</h3>

            <p className="section-description">Add image URLs for your campsite</p>

           

            {formData.images.map((image, index) => (

              <div key={index} className="array-input-group">

                <input

                  type="url"

                  value={image}

                  onChange={(e) => handleArrayChange('images', index, e.target.value)}

                  placeholder="https://example.com/image.jpg"

                  className={errors.images ? 'error' : ''}

                />

                {formData.images.length > 1 && (

                  <button

                    type="button"

                    onClick={() => removeArrayItem('images', index)}

                    className="remove-btn"

                  >

                    <FiTrash2 />

                  </button>

                )}

              </div>

            ))}

           

            <button

              type="button"

              onClick={() => addArrayItem('images')}

              className="add-btn"

            >

              <FiPlus /> Add Another Image

            </button>

           

            {errors.images && <span className="error-text">{errors.images}</span>}

          </div>



          {/* Facilities */}

          <div className="form-section">

            <h3><FiWifi /> Facilities</h3>

            <p className="section-description">What facilities are available at this campsite?</p>

           

            <div className="facility-suggestions">

              <p>Quick add:</p>

              <div className="suggestion-chips">

                {facilityOptions.map(facility => (

                  <button

                    key={facility}

                    type="button"

                    onClick={() => {

                      const emptyIndex = formData.facilities.findIndex(f => !f.trim());

                      if (emptyIndex !== -1) {

                        handleArrayChange('facilities', emptyIndex, facility);

                      } else {

                        setFormData(prev => ({

                          ...prev,

                          facilities: [...prev.facilities, facility]

                        }));

                      }

                    }}

                    className="suggestion-chip"

                  >

                    {facility}

                  </button>

                ))}

              </div>

            </div>

           

            {formData.facilities.map((facility, index) => (

              <div key={index} className="array-input-group">

                <input

                  type="text"

                  value={facility}

                  onChange={(e) => handleArrayChange('facilities', index, e.target.value)}

                  placeholder="e.g., Restrooms, WiFi, Fire Pit"

                />

                {formData.facilities.length > 1 && (

                  <button

                    type="button"

                    onClick={() => removeArrayItem('facilities', index)}

                    className="remove-btn"

                  >

                    <FiTrash2 />

                  </button>

                )}

              </div>

            ))}

           

            <button

              type="button"

              onClick={() => addArrayItem('facilities')}

              className="add-btn"

            >

              <FiPlus /> Add Another Facility

            </button>

          </div>



          {/* Tags */}

          <div className="form-section">

            <h3><FiTag /> Tags</h3>

            <p className="section-description">Add tags to help others find your campsite</p>

           

            <div className="facility-suggestions">

              <p>Quick add:</p>

              <div className="suggestion-chips">

                {tagOptions.map(tag => (

                  <button

                    key={tag}

                    type="button"

                    onClick={() => {

                      const emptyIndex = formData.tags.findIndex(t => !t.trim());

                      if (emptyIndex !== -1) {

                        handleArrayChange('tags', emptyIndex, tag);

                      } else {

                        setFormData(prev => ({

                          ...prev,

                          tags: [...prev.tags, tag]

                        }));

                      }

                    }}

                    className="suggestion-chip"

                  >

                    {tag}

                  </button>

                ))}

              </div>

            </div>

           

            {formData.tags.map((tag, index) => (

              <div key={index} className="array-input-group">

                <input

                  type="text"

                  value={tag}

                  onChange={(e) => handleArrayChange('tags', index, e.target.value)}

                  placeholder="e.g., Family Friendly, Scenic Views"

                />

                {formData.tags.length > 1 && (

                  <button

                    type="button"

                    onClick={() => removeArrayItem('tags', index)}

                    className="remove-btn"

                  >

                    <FiTrash2 />

                  </button>

                )}

              </div>

            ))}

           

            <button

              type="button"

              onClick={() => addArrayItem('tags')}

              className="add-btn"

            >

              <FiPlus /> Add Another Tag

            </button>

          </div>



          {/* Submit Buttons */}

          <div className="form-actions">

            <button

              type="button"

              onClick={() => navigate('/campsites')}

              className="btn-secondary"

              disabled={isSubmitting}

            >

              <FiX /> Cancel

            </button>

           

            <button

              type="submit"

              className="btn-primary"

              disabled={isSubmitting}

            >

              {isSubmitting ? (

                <>

                  <FiUpload className="spinning" /> Creating...

                </>

              ) : (

                <>

                  <FiSave /> Create Campsite

                </>

              )}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

};



export default AddCampsitePage;