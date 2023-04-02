const fs = require("fs");
const readline = require("readline");

//API
const { buildApiIndexFile } = require("./structure/pages/api/[entity]/index");
const {
    buildApiIdentifierFile,
} = require("./structure/pages/api/[entity]/[identifier]");

//Admin
const {
    buildAdminIndexFile,
} = require("./structure/pages/admin/[module]/index");
const {
    buildAdminIdentifierFile,
} = require("./structure/pages/admin/[module]/[identifier]");

//Frontend
const { buildEntityIndexFile } = require("./structure/pages/[entity]/index");
const {
    buildEntityIdentifierFile,
} = require("./structure/pages/[entity]/[...identifier]");

//Hooks
const { buildUseEntityFile } = require("./structure/hooks/[entity]/useEntity");
const {
    buildUseEntitiesFile,
} = require("./structure/hooks/[entity]/useEntities");

//Components => Organisms
const {
    buildEntityOrganismFile,
} = require("./structure/components/organisms/[entity]/EntityOrganism");
const {
    buildEntityListOrganismFile,
} = require("./structure/components/organisms/[entity]/EntityListOrganism");
const {
    buildEntityDeletionOrganismFile,
} = require("./structure/components/organisms/[entity]/EntityDeletionOrganism");
const {
    buildEntityCreationOrganismFile,
} = require("./structure/components/organisms/[entity]/EntityCreationOrganism");

//Components => _Molecules
const {
    buildEntityListCardFile,
} = require("./structure/components/_molecules/[entity]/EntityListCard");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const baseDir = "./output"; // Base directory to write files

rl.question("Enter an Uppercase Plural: ", (uppercasePlural) => {
    rl.question("Enter an Uppercase Singular: ", (uppercaseSingular) => {
        rl.question("Enter a Lowercase Plural: ", (lowercasePlural) => {
            rl.question("Enter a Lowercase Singular: ", (lowercaseSingular) => {
                //API
                const apiDir = `${baseDir}/pages/api/${lowercasePlural}/`;

                const apiIndexFile = `${apiDir}index.ts`;
                const apiIdentifierFile = `${apiDir}[identifier].ts`;

                const apiIndexContent = buildApiIndexFile({
                    uppercasePlural,
                    uppercaseSingular,
                    lowercasePlural,
                    lowercaseSingular,
                });
                const apiIdentifierContent = buildApiIdentifierFile({
                    uppercasePlural,
                    uppercaseSingular,
                    lowercasePlural,
                    lowercaseSingular,
                });

                //Admin
                const adminDir = `${baseDir}/pages/admin/${lowercasePlural}/`;

                const adminIndexFile = `${adminDir}index.tsx`;
                const adminIdentifierFile = `${adminDir}[identifier].tsx`;

                const adminIndexContent = buildAdminIndexFile({
                    uppercasePlural,
                    uppercaseSingular,
                    lowercasePlural,
                    lowercaseSingular,
                });
                const adminIdentifierContent = buildAdminIdentifierFile({
                    uppercasePlural,
                    uppercaseSingular,
                    lowercasePlural,
                    lowercaseSingular,
                });

                //Frontend
                const frontendDir = `${baseDir}/pages/${lowercasePlural}/`;

                const entityIndexFile = `${frontendDir}index.tsx`;
                const entityIdentifierFile = `${frontendDir}[...identifier].tsx`;

                const entityIndexContent = buildEntityIndexFile({
                    uppercasePlural,
                    uppercaseSingular,
                    lowercasePlural,
                    lowercaseSingular,
                });
                const entityIdentifierContent = buildEntityIdentifierFile({
                    uppercasePlural,
                    uppercaseSingular,
                    lowercasePlural,
                    lowercaseSingular,
                });

                //Hooks
                const hooksDir = `${baseDir}/hooks/${lowercasePlural}/`;

                const useEntityFile = `${hooksDir}use${uppercaseSingular}.ts`;
                const useEntitiesFile = `${hooksDir}use${uppercasePlural}.ts`;

                const useEntityContent = buildUseEntityFile({
                    uppercasePlural,
                    uppercaseSingular,
                    lowercasePlural,
                    lowercaseSingular,
                });
                const useEntitiesContent = buildUseEntitiesFile({
                    uppercasePlural,
                    uppercaseSingular,
                    lowercasePlural,
                    lowercaseSingular,
                });

                //Components => Organisms
                const componentOrganismDir = `${baseDir}/components/organisms/${lowercasePlural}/`;

                const entityCreationOrganismFile = `${componentOrganismDir}${uppercaseSingular}CreationOrganism.tsx`;
                const entityDeletionOrganismFile = `${componentOrganismDir}${uppercaseSingular}DeletionOrganism.tsx`;
                const entityListOrganismFile = `${componentOrganismDir}${uppercaseSingular}ListOrganism.tsx`;
                const entityOrganismFile = `${componentOrganismDir}${uppercaseSingular}Organism.tsx`;

                const entityOrganismContent = buildEntityOrganismFile({
                    uppercasePlural,
                    uppercaseSingular,
                    lowercasePlural,
                    lowercaseSingular,
                });
                const entityListOrganismContent = buildEntityListOrganismFile({
                    uppercasePlural,
                    uppercaseSingular,
                    lowercasePlural,
                    lowercaseSingular,
                });
                const entityDeletionOrganismContent =
                    buildEntityDeletionOrganismFile({
                        uppercasePlural,
                        uppercaseSingular,
                        lowercasePlural,
                        lowercaseSingular,
                    });
                const entityCreationOrganismContent =
                    buildEntityCreationOrganismFile({
                        uppercasePlural,
                        uppercaseSingular,
                        lowercasePlural,
                        lowercaseSingular,
                    });

                //Components => _Molecules
                const componentMoleculesDir = `${baseDir}/components/_molecules/${lowercasePlural}/`;

                const entityListCardFile = `${componentMoleculesDir}${uppercaseSingular}ListCard.tsx`;

                const entityListCardContent = buildEntityListCardFile({
                    uppercasePlural,
                    uppercaseSingular,
                    lowercasePlural,
                    lowercaseSingular,
                });

                // Create directories if they don't exist
                fs.mkdirSync(apiDir, { recursive: true });
                fs.mkdirSync(adminDir, { recursive: true });
                fs.mkdirSync(frontendDir, { recursive: true });
                fs.mkdirSync(hooksDir, { recursive: true });
                fs.mkdirSync(componentOrganismDir, { recursive: true });
                fs.mkdirSync(componentMoleculesDir, { recursive: true });

                //API
                fs.writeFile(apiIndexFile, apiIndexContent, (err) => {
                    if (err) throw err;
                    console.log(
                        "API index file created with name:",
                        apiIndexFile
                    );
                });

                fs.writeFile(apiIdentifierFile, apiIdentifierContent, (err) => {
                    if (err) throw err;
                    console.log(
                        "API identifier file created with name:",
                        apiIdentifierFile
                    );
                });

                //Admin
                fs.writeFile(adminIndexFile, adminIndexContent, (err) => {
                    if (err) throw err;
                    console.log(
                        "Admin index file created with name:",
                        adminIndexFile
                    );
                });

                fs.writeFile(
                    adminIdentifierFile,
                    adminIdentifierContent,
                    (err) => {
                        if (err) throw err;
                        console.log(
                            "Admin identifier file created with name:",
                            adminIdentifierFile
                        );
                    }
                );

                //Frontend
                fs.writeFile(entityIndexFile, entityIndexContent, (err) => {
                    if (err) throw err;
                    console.log(
                        "Frontend index file created with name:",
                        entityIndexFile
                    );
                });
                fs.writeFile(
                    entityIdentifierFile,
                    entityIdentifierContent,
                    (err) => {
                        if (err) throw err;
                        console.log(
                            "Frontend identifier file created with name:",
                            entityIdentifierFile
                        );
                    }
                );

                //Hooks
                fs.writeFile(useEntityFile, useEntityContent, (err) => {
                    if (err) throw err;
                    console.log(
                        "useEntity file created with name:",
                        useEntityFile
                    );
                });
                fs.writeFile(useEntitiesFile, useEntitiesContent, (err) => {
                    if (err) throw err;
                    console.log(
                        "useEntities file created with name:",
                        useEntitiesFile
                    );
                });

                //Components => Organisms
                fs.writeFile(
                    entityOrganismFile,
                    entityOrganismContent,
                    (err) => {
                        if (err) throw err;
                        console.log(
                            "Organism file created with name:",
                            entityOrganismFile
                        );
                    }
                );
                fs.writeFile(
                    entityListOrganismFile,
                    entityListOrganismContent,
                    (err) => {
                        if (err) throw err;
                        console.log(
                            "Organism list file created with name:",
                            entityListOrganismFile
                        );
                    }
                );
                fs.writeFile(
                    entityDeletionOrganismFile,
                    entityDeletionOrganismContent,
                    (err) => {
                        if (err) throw err;
                        console.log(
                            "Organism deletion file created with name:",
                            entityDeletionOrganismFile
                        );
                    }
                );
                fs.writeFile(
                    entityCreationOrganismFile,
                    entityCreationOrganismContent,
                    (err) => {
                        if (err) throw err;
                        console.log(
                            "Organism creation file created with name:",
                            entityCreationOrganismFile
                        );
                    }
                );

                //Components => _Molecules
                fs.writeFile(
                    entityListCardFile,
                    entityListCardContent,
                    (err) => {
                        if (err) throw err;
                        console.log(
                            "Entity list card file created with name:",
                            entityListCardFile
                        );
                    }
                );

                rl.close();
            });
        });
    });
});
