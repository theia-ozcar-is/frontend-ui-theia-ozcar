frontend-ui-theia-ozcar
=======================

**Repository of the web application for variable association**

Frontend container application of the Theia/OZCAR data portal. This frontend application is used with [this backend application](https://gricad-gitlab.univ-grenoble-alpes.fr/theia-ozcar/backend-springboot/-/tree/master/backend-metadata-portal). The application is described : https://theia-ozcar.gricad-pages.univ-grenoble-alpes.fr/documentations/docs/dataportal-doc/index.html

The Kubernetes deployment file is versionned here: https://gricad-gitlab.univ-grenoble-alpes.fr/theia-ozcar/config-repo/-/blob/master/base/deployment-metadata-portal.yml

### Environement variables

The following env variables need to be set:
- API_URL=http://in-situ.theia-land.fr  #Backend application base URL

### Ports
- 80
