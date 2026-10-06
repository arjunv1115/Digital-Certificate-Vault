const CERTIFICATE_KEY = "dcv_certificates";

export const getCertificates = () => {
  try {
    return JSON.parse(localStorage.getItem(CERTIFICATE_KEY)) || [];
  } catch {
    return [];
  }
};

export const saveCertificates = (certificates) => {
  localStorage.setItem(
    CERTIFICATE_KEY,
    JSON.stringify(certificates)
  );
};

export const getUserCertificates = (userId) => {
  return getCertificates().filter(
    (certificate) => certificate.userId === userId
  );
};

export const addCertificate = (certificate) => {
  const certificates = getCertificates();

  certificates.push(certificate);

  saveCertificates(certificates);
};

export const updateCertificate = (id, updatedCertificate) => {
  const certificates = getCertificates();

  const updated = certificates.map((certificate) =>
    certificate.id === id
      ? {
          ...certificate,
          ...updatedCertificate,
        }
      : certificate
  );

  saveCertificates(updated);
};

export const deleteCertificate = (id) => {
  const certificates = getCertificates();

  const updated = certificates.filter(
    (certificate) => certificate.id !== id
  );

  saveCertificates(updated);
};