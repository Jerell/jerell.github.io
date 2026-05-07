---
date: 2018-01-08
tags: []
---

## Software engineer

Research and development of engineering software for carbon capture, thermodynamics, geospatial network modelling, and internal business operations using Zig, TypeScript, C#/.NET, Julia, WebAssembly, WebGPU, and Azure.

### Geodash

#zig #typescript #react #electron #bun #webassembly #webgpu #onnx

Built a geospatial flow-network platform for constructing, querying, evaluating, and simulating directed pipeline networks.

Implemented a Zig/WebAssembly core for TOML network loading, hierarchical property inheritance, query execution, shapefile handling, coordinate reprojection, and OLGA `.key` import/export.

Designed GPU-accelerated steady-state simulation workflows using ONNX thermodynamic property surfaces, WebGPU compute shaders, and Zarr-backed result storage for pressure-enthalpy design-space exploration.

### Dim

#zig #webassembly

Built a dimensional analysis and unit-conversion library with compile-time dimensional safety, derived-unit arithmetic, SI/Imperial/CGS registries, affine units, formatting, and a CLI expression evaluator.

Compiled the library to WebAssembly for browser integration, exposing unit-safe calculations to engineering applications such as Geodash.

### Phase Envelope Generator

#typescript #nextjs #react #webgpu #threejs #onnx

Developed an interactive thermodynamic phase-envelope and flash-calculation web application for multi-component fluid compositions.

Integrated ONNX Runtime Web inference for phase, density, entropy, temperature, viscosity, and related thermodynamic properties, with worker-based batch evaluation for responsive plotting.

### Timesheets

#typescript #react #nextjs #nestjs #azure #docker #terraform #github-actions

Built and maintained the company-wide project, time-submission, and reporting system used by employees to record project work and generate progress/cost reports.

Implemented an event-sourced NestJS backend with CQRS-style commands, events, read projections, reindexing tools, Azure Table Storage, Azure AD authentication, and queue-backed projection updates.

### Ichthys LNG Phase 2a FEED

Optimised subsea design configurations using an evolutionary algorithm; paper presented at the BHR 19th International Conference on Multiphase Production Technology, Cannes, France, June 2019.
