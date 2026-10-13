FROM node:24-bookworm-slim
WORKDIR /app
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH="${PNPM_HOME}/bin:${PNPM_HOME}:${PATH}"
RUN npm install --global pnpm@11.25.0 \
    && pnpm config set store-dir /root/.local/share/pnpm/store --global
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
EXPOSE 5173 4173
CMD ["pnpm", "dev"]
